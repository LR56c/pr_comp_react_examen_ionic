import { useState }  from "react"
import {
  FirebaseFirestoreProductsData
}                    from "../modules/infrastructure/firebase_firestore_products_data"
import type { Products } from "../modules/domain/products"

export function useProducts() {
  const firestoreRepo     = new FirebaseFirestoreProductsData()
  const [products, setProducts] = useState<Products[]>( [] )
  const addProduct              = async ( name: string,
    price: number ) => {
    const randomNumber = Math.floor( Math.random() * 200 )
    const product: Products   = {
      id: randomNumber.toString(),
      name,
      price
    }

    return await firestoreRepo.create( product )
  }

  const getProducts = async () => {
    const tasks = await firestoreRepo.getAll()
    setProducts( tasks )
  }

  const removeProduct = async ( product: Products ) => {
    const result = await firestoreRepo.delete( product )
    if ( result ) {
      setProducts( products.filter( p => p.id !== product.id ) )
    }
  }

  return { products, addProduct, getProducts, removeProduct }
}
