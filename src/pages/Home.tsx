import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import "./Home.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { AddProduct }      from "../components/add_product"
import { ProductsList }                   from "../components/products_list"
import { CreateProduct, useProductStore } from "../hooks/use_products"
import Nav                                from "../components/nav"
import { useAuthStore }    from "../hooks/use_auth"

const Home: React.FC = () => {

  const auth       = useAuthStore( state => state.auth )
  const addProduct       = useProductStore( state => state.addProduct )
  const handleAddProduct = async ( name: string, price: number,
    image: File ) => {
    await addProduct({
      name       : name,
      price      : price,
      image      : image,
      userEmail  : auth!.email
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
          <Nav/>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="p-4 flex gap-4">
          <ProductsList className="basis-1/2"></ProductsList>
          <AddProduct className="basis-1/2"
                      onAddProduct={ handleAddProduct }></AddProduct>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
