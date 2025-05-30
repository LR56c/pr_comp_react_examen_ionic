import { ComponentPropsWithoutRef, type FC, useEffect, useState } from "react"
import type {
  Products
}                                                                 from "../modules/domain/products"
import {
  useProductStore
}                                                                 from "../hooks/use_products"
import {
  ProductCard
}                                                                 from "./product_card"


export const ProductsList: FC<ComponentPropsWithoutRef<"div">> = ( { ...props } ) => {
  const products      = useProductStore( state => state.products )
  const getProducts   = useProductStore( state => state.getProducts )
  const removeProduct = useProductStore( state => state.removeProduct )

  const [isLoading, setIsLoading] = useState( true )
  useEffect( () => {
    const fetchData = async () => {
      try {
        await getProducts()
      }
      catch ( error ) {
        console.error( "Error fetching data:", error )
      }
      finally {
        setIsLoading( false )
      }
    }
    fetchData()
  }, [] )


  const handleDelete = async ( product: Products ) => {
    await removeProduct( product )
  }

  return (
      <div className="w-full flex flex-col gap-4 items-center" { ...props }>
        <h2 className="text-2xl font-bold mb-4">Productos</h2>
        { !isLoading && products.length === 0 ? (
          <p className="text-gray-500">No hay productos</p>
        ) : null }
        { !isLoading && products.length > 0 ? (
          <>
            { products.map( ( product ) => (
              <ProductCard onDelete={ p => handleDelete( p ) }
                           key={ product.name }
                           product={ product }></ProductCard>
            ) ) }
          </>
        ) : null }
        { isLoading ? (
          <div className="flex justify-center items-center">Cargando...</div>
        ) : null }
      </div>
  )
}
