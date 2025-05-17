import {
  FirebaseFirestoreProductsData
} from "../modules/infrastructure/firebase_firestore_products_data"

import type { Products } from "../modules/domain/products"

import {
  FirebaseStorageData
}                 from "../modules/infrastructure/firebase_storage_data"
import { create } from "zustand/index"

export type CreateProduct = {
  name: string,
  price: number,
  image: File,
  userEmail: string
}

type ProductState = {
  products: Products[]
  addProduct: (product : CreateProduct) => Promise<boolean>
  getProducts: () => Promise<void>
  removeProduct: ( product: Products ) => Promise<void>
}
const firestoreRepo          = new FirebaseFirestoreProductsData()
const storageRepo            = new FirebaseStorageData()
export const useProductStore = create<ProductState>( ( set ) => (
  {
    products     : [],
    addProduct   : async (product : CreateProduct) => {
      const randomNumber      = Math.floor( Math.random() * 200 )
      const imageUrl          = await storageRepo.upload( product.image )
      const newProduct: Products = {
        id        : randomNumber.toString(),
        name: product.name,
        price: product.price,
        image     : imageUrl,
        uploadedBy: product.userEmail
      }

      const result = await firestoreRepo.create( newProduct )
      if ( result ) {
        set( ( state ) => (
          {
            products: [...state.products, newProduct]
          }
        ) )
        return true
      }
      else {
        return false
      }
    },
    getProducts  : async () => {
      const tasks = await firestoreRepo.getAll()
      if ( tasks ) {
        set( { products: tasks } )
      }
    },
    removeProduct: async ( product: Products ) => {
      const result = await firestoreRepo.delete( product )
      if ( result ) {
        set( ( state ) => (
          {
            products: state.products.filter( p => p.id !== product.id )
          }
        ) )
      }
    }
  }
) )
