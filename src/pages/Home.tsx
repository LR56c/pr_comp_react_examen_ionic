import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {
  AddProduct
}                                                               from "../components/add_product"
import {
  ProductsList
}                                                               from "../components/products_list"
import { Button } from "react-bootstrap"

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Button>Bootstrap</Button>
        <AddProduct></AddProduct>
        <ProductsList></ProductsList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
