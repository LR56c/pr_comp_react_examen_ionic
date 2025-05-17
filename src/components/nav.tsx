import { IonButton, IonButtons } from "@ionic/react"
import { useAuthStore }          from "../hooks/use_auth"
import { useLocation }           from "react-router-dom"

export default function Nav() {
  const auth         = useAuthStore( state => state.auth )
  const location     = useLocation()
  const logout       = useAuthStore( state => state.logout )
  const handleLogout = async () => {
    await logout()
  }
  return (
    <IonButtons slot="end">
      { auth ? (
        <>
          <IonButton onClick={ handleLogout }> Cerrar Sesion </IonButton>
        </>
      ) : (
        <>
          { location.pathname !== "/login" ?
            <IonButton routerLink="/login"> Iniciar Sesion </IonButton>
            : null }

          { location.pathname !== "/register" ?
          <IonButton routerLink="/register"> Registrarse </IonButton>
            : null }
        </>
      ) }
    </IonButtons>
  )
}
