import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
}                                from "firebase/storage"
import { FileStorageRepository } from "../domain/file_storage_repository"
import { firebase }              from "../../../firebase"

export class FirebaseStorageData implements FileStorageRepository {
  private readonly storage

  constructor() {
    this.storage = getStorage( firebase )
  }

  async delete( name: string ): Promise<void> {
    await deleteObject( ref( this.storage, name ) )
  }

  async upload( file: File ): Promise<string> {
    const name = `${ file.name }-${ Date.now() }`
    await uploadBytes( ref( this.storage, name ), file )
    return this.getUrl( name )
  }

  async getUrl( name: string ): Promise<string> {
    return await getDownloadURL( ref( this.storage, name ) )
  }
}
