import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
}                           from "@ionic/react"
import { useAuthStore }     from "../hooks/use_auth"
import Form                 from "react-bootstrap/Form"
import { Button }           from "react-bootstrap"
import { useState }         from "react"
import { useValidation }    from "react-simple-form-validator"
import { parseRuleMessage } from "../utils/parse_error_messages"
import Nav                  from "../components/nav"

const Register: React.FC = () => {
  const register = useAuthStore( state => state.register )

  const [email, setEmail]         = useState( "" )
  const [password, setPassword]   = useState( "" )
  const [isTouched, setIsTouched] = useState( false )
  const [isLoading, setIsLoading] = useState( false )


  const { isFormValid, getFailedRulesInField } = useValidation( {
    fieldsRules: {
      email   : { required: true },
      password: { required: true }
    },
    state      : { email, password }
  } )
  const handleSubmit                           = async ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( !isTouched ) {
      setIsTouched( true )
    }
    if ( !isFormValid ) {
      return
    }
    setIsLoading( true )
    await register( email, password )
    setIsLoading( false )
    setEmail( "" )
    setPassword( "" )
    setIsTouched( false )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
          <Nav/>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registrarse</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex flex-col items-center w-full pt-24">
          <form
            className="flex flex-col gap-4 w-full max-w-xl"
            onSubmit={ handleSubmit }>
            <div className="flex flex-col">
              <Form.Label htmlFor="email">Correo</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={ email }
                onChange={ ( e ) => {
                  setEmail( e.target.value )
                  setIsTouched( true )
                } }
              />
              { isTouched ? getFailedRulesInField( "email" )
                .map( ( error, index ) => (
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                        key={ index }>{ parseRuleMessage( error ) }</span>
                ) ) : null }
            </div>
            <div className="flex flex-col">
              <Form.Label htmlFor="password">Contraseña</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={ password }
                onChange={ ( e ) => {
                  setPassword( e.target.value )
                  setIsTouched( true )
                } }
              />
              { isTouched ? getFailedRulesInField( "password" )
                .map( ( error, index ) => (
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                        key={ index }>{ parseRuleMessage( error ) }</span>
                ) ) : null }
            </div>
            <Button disabled={ isLoading }
                    className="bg-slate-300 font-medium rounded py-3 px-6 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-50"
                    type="submit">Enviar
            </Button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Register
