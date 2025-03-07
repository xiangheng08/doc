// paste.ts
export type Mode = 'file' | 'structure'

export class Structure {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  isFile(): this is FileStructure {
    return this instanceof FileStructure
  }

  isDirectory(): this is DirectoryStructure {
    return this instanceof DirectoryStructure
  }
}

export class FileStructure extends Structure {
  readonly file: File

  constructor(file: File) {
    super(file.name)
    this.file = file
  }
}

export class DirectoryStructure extends Structure {
  readonly children: Structure[]

  constructor(name: string, children: Structure[]) {
    super(name)
    this.children = children
  }
}

export type PasteOptions = {
  /**
   * 是否在解析到文件后阻止默认粘贴行为
   * @default true
   */
  preventDefault?: boolean
}

export type PasteResult<T extends Mode> = {
  /**
   * 拖拽的文件或文件结构
   */
  result: T extends 'structure' ? Structure[] : File[]
  /**
   * 在文件结构模式中，是否支持读取文件结构
   */
  structureNotSupported: boolean
  /**
   * 在文件结构模式中，是否包含文件夹
   */
  hasDirectories: boolean
}

// 辅助函数：从剪贴板获取条目
const getPasteEntries = (e: ClipboardEvent): FileSystemEntry[] => {
  return Array.from(e.clipboardData?.items || [])
    .filter((item) => item.kind === 'file')
    .map((item) => item.webkitGetAsEntry())
    .filter(Boolean) as FileSystemEntry[]
}

// 辅助函数：从剪贴板获取文件
const getPasteFiles = (e: ClipboardEvent): File[] => {
  return Array.from(e.clipboardData?.files || [])
}

// 辅助函数：解析文件结构
export async function parseStructure(
  entries: FileSystemEntry[],
): Promise<Structure[]> {
  const result: Structure[] = []

  for (const entry of entries) {
    if (!entry) continue
    if (entry.isDirectory) {
      const directory = entry as FileSystemDirectoryEntry
      const directoryReader = directory.createReader()
      const children = await new Promise<Structure[]>((resolve) => {
        directoryReader.readEntries((entries) =>
          resolve(parseStructure(entries)),
        )
      })
      result.push(new DirectoryStructure(directory.name, children))
    } else {
      const file = entry as FileSystemFileEntry
      const fileStructure = await new Promise<FileStructure>(
        (resolve, reject) => {
          file.file((file) => resolve(new FileStructure(file)), reject)
        },
      )
      result.push(fileStructure)
    }
  }

  return result
}

// 主解析函数
export async function parsePasteEvent<T extends Mode>(
  e: ClipboardEvent,
  mode: T,
  options?: PasteOptions,
): Promise<PasteResult<T>> {
  const { preventDefault = true } = options || {}

  if (preventDefault) {
    e.preventDefault()
  }

  const files = getPasteFiles(e)
  const entries = getPasteEntries(e)

  const payload: PasteResult<T> = {
    result: [],
    structureNotSupported: false,
    hasDirectories: false,
  }

  type Result = PasteResult<T>['result']

  if (mode === 'structure') {
    if (entries.length === 0) return payload

    // 结构解析逻辑（需要异步处理）
    try {
      const structureResult = await parseStructure(entries)
      payload.hasDirectories = structureResult.some((item) =>
        item.isDirectory(),
      )
    } catch (_) {
      payload.structureNotSupported = true
      payload.result = files.map(
        (file) => new FileStructure(file),
      ) as unknown as Result
    }
  } else {
    // 文件解析逻辑
    if (files.length === 0) return payload
    payload.result = files as Result
  }

  return payload
}
