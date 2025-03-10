// utils.ts

import { inject, ref, type Ref } from 'vue'

export type Mode = 'file' | 'structure'

export class DropError extends Error {
  readonly code: string

  constructor(message: string, code: string) {
    super(message)
    this.name = 'DropError'
    this.code = code
  }
}

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

export interface DropResult<T extends Mode> {
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
  /**
   * 过滤后的文件列表（在文件模式下，通过配置 `accept` 参数，过滤掉的文件）
   */
  filtered: File[]
}

/**
 * 拖拽处理函数类型
 */
export type HandleDrop<T extends Mode> = (payload: DropResult<T>) => void

export const getFiles = (e: DragEvent): File[] => {
  return Array.from(e.dataTransfer?.files || [])
}

export const getEntries = (e: DragEvent): FileSystemEntry[] => {
  return Array.from(e.dataTransfer?.items || [])
    .map((item) => item.webkitGetAsEntry())
    .filter(Boolean) as FileSystemEntry[]
}

/**
 * 解析文件结构
 */
export const parseStructure = async (
  entries: FileSystemEntry[],
): Promise<Structure[]> => {
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

/**
 * 从父组件注入 `isDragging` ref。
 */
export const injectDragging = () => {
  return inject<Ref<boolean>>('isDragging') || ref(false)
}

export const filterFilesByAccept = (
  files: File[],
  accept?: string,
): {
  allowed: File[]
  invalid: File[]
} => {
  if (!accept) return { allowed: files, invalid: [] }

  const allowedTypes = accept.split(',').map((t) => t.trim())
  const allowed: File[] = [] // 符合的
  const invalid: File[] = [] // 不符合的

  for (const file of files) {
    const matched = allowedTypes.some((type) => {
      // 处理扩展名匹配 (如 .pdf)
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }

      // 处理 MIME 类型匹配 (如 image/*)
      const [category, subtype] = type.split('/')
      const regex = new RegExp(
        `${category}/${subtype === '*' ? '.*' : subtype}$`,
      )
      return regex.test(file.type)
    })

    if (matched) {
      allowed.push(file)
    } else {
      invalid.push(file)
    }
  }

  return { allowed, invalid }
}
