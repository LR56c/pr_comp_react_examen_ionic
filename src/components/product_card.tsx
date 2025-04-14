import { type  FC }                      from "react"
import type { Products }                 from "../modules/domain/products"

interface ProductCardProps {
  product: Products
  onDelete: ( project: Products ) => void
}

const formatDate = ( date: string ) => {
  let options: Intl.DateTimeFormatOptions = {
    day : "numeric", month: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  }

  const validDate = new Date( date )
  return validDate.toLocaleDateString( "es-ES", options )
}

export const ProductCard: FC<ProductCardProps> = ( { product, onDelete } ) => {
  return (
    <div
      className="flex flex-col border border-slate-200 rounded-xl p-4 w-full">
      <div className="flex items-center justify-between">
        <div>{product.name}</div>
        <div>{product.price}</div>
        <button onClick={ () => onDelete( product ) }
                className="cursor-pointer flex items-center justify-center bg-red-300 rounded p-1 w-8 h-8">
          Eliminar
        </button>
      </div>
    </div>
  )
}
