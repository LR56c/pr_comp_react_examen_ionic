
export abstract class FileStorageRepository {
  abstract upload( file: File ): Promise<string>
  abstract delete( fileUrl: string ): Promise<void>
}
