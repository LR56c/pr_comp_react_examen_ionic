import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc
}                         from "firebase/firestore"
import { firebase }                from "../../../firebase"
import type { ProductsRepository } from "../domain/products_repository"
import type { Products }           from "../domain/products"

export class FirebaseFirestoreProductsData implements ProductsRepository {
  private readonly db

  constructor() {
    this.db = collection( getFirestore( firebase ), "products" )
  }

  async create( product: Products ): Promise<boolean> {
    try {
      const docRef = doc( this.db, `${ product.name }-${ product.id }` )
      await setDoc( docRef, product )
      return true
    }
    catch ( e ) {
      console.log( "Error creating product", e )
      return false
    }
  }

  async delete( product: Products ): Promise<boolean> {
    try {
      const docRef = doc( this.db, `${ product.name }-${ product.id }` )
      await deleteDoc( docRef )
      return true

    }
    catch ( e ) {
      console.log( "Error deleting product", e )
      return false
    }
  }

  async getAll(): Promise<Products[]> {
    try {

      const products: Products[] = []
      const query             = await getDocs( this.db )
      query.forEach( result => {
        products.push( result.data() as Products )
      } )
      return products
    }
    catch ( e ) {
      console.log( "Error getting products", e )
      return []
    }
  }

}
