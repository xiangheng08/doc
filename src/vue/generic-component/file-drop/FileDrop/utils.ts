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
  result: T extends 'structure' ? Structure[] : File[]
  filteredItems: File[]
  structureNotSupported: boolean
}

export type HandleDrop<T extends Mode> = (payload: DropResult<T>) => void

export const getFiles = (e: DragEvent): File[] => {
  return Array.from(e.dataTransfer?.files || [])
}

export const getEntries = (e: DragEvent): FileSystemEntry[] => {
  return Array.from(e.dataTransfer?.items || [])
    .map((item) => item.webkitGetAsEntry())
    .filter(Boolean) as FileSystemEntry[]
}

export const parseStructure = async (entries: FileSystemEntry[]): Promise<Structure[]> => {
  const result: Structure[] = []

  for (const entry of entries) {
    if (!entry) continue
    if (entry.isDirectory) {
      const directory = entry as FileSystemDirectoryEntry
      const directoryReader = directory.createReader()
      const children = await new Promise<Structure[]>((resolve) => {
        directoryReader.readEntries((entries) => resolve(parseStructure(entries)))
      })
      result.push(new DirectoryStructure(directory.name, children))
    } else {
      const file = entry as FileSystemFileEntry
      const fileStructure = await new Promise<FileStructure>((resolve, reject) => {
        file.file((file) => resolve(new FileStructure(file)), reject)
      })
      result.push(fileStructure)
    }
  }

  return result
}

export const injectDragging = () => {
  return inject<Ref<boolean>>('isDragging') || ref(false)
}
