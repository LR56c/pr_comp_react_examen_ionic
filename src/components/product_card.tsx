import { type  FC }            from "react"
import type { Products }       from "../modules/domain/products"
import { Button, Card, Image } from "react-bootstrap"

interface ProductCardProps {
  product: Products
  onDelete: ( project: Products ) => void
}

export const ProductCard: FC<ProductCardProps> = ( { product, onDelete } ) => {
  return (
    <Card
      className="flex flex-col border border-slate-200 rounded-xl p-4 w-full mt-4">
      <div className="flex items-center justify-between">
        <Image className="object-cover w-24 h-24" src={ product.image }
               rounded/>
        <div className="flex flex-col justify-between">
          <div>Nombre: { product.name }</div>
          <div>Precio: ${ product.price }</div>
          <div>Subido por: { product.uploadedBy }</div>
        </div>
        <Button variant="danger" onClick={ () => onDelete( product ) }>
          Eliminar
        </Button>
      </div>
    </Card>
  )
}
