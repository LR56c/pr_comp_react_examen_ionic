import { type FC, useState }  from "react"
import { useValidation } from "react-simple-form-validator"
import { useProducts }        from "../hooks/use_products"

const parseRuleMessage      = ( rule: string ) => {
  switch ( rule ) {
    case "required":
      return "Este campo es obligatorio"
    case "date":
      return "El campo debe ser una fecha válida"
    default:
      return ""
  }
}
export const AddProduct: FC = () => {
  const [name, setName]           = useState( "" )
  const [price, setPrice]         = useState( 0 )
  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const tasks                      = useProducts()

  const { isFormValid, getFailedRulesInField } = useValidation( {
    fieldsRules: {
      name       : { required: true },
      price: { required: true}
    },
    state      : { name, price }
  } )

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()
    if(!isTouched){
      setIsTouched(true)
    }
    if ( !isFormValid ) {
      return
    }
    setIsLoading( true )
    const result = await tasks.addProduct( name, price )
    setIsLoading( false )
    if(!result){
      alert("Error al crear el producto. Intente nuevamente")
      return
    }
    alert( "Producto creado exitosamente!" )
    setName( "" )
    setPrice( 0 )
    setIsTouched(false)
  }

  return (
    <form className="flex flex-col gap-4 w-full max-w-lg"
          onSubmit={ handleSubmit }>
      <div className="flex flex-col">
        <label htmlFor="name"
               className="block mb-2 text-sm font-medium text-gray-900">Nombre producto:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ name }
          onChange={ ( e ) => {
            setName( e.target.value )
            setIsTouched(true)
          } }
        />
        { isTouched ? getFailedRulesInField( "name" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null }
      </div>
      <div className="flex flex-col">
        <label htmlFor="fecha"
               className="block mb-2 text-sm font-medium text-gray-900">Precio</label>
        <input
          type="number"
          name="fecha"
          id="fecha"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={ price }
          onChange={ ( e ) => {
            setPrice( Number(e.target.value) )
            setIsTouched(true)
          }}
        />
        { isTouched ? getFailedRulesInField( "price" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null}
      </div>
      <button disabled={isLoading} className="bg-slate-300 font-medium rounded py-3 px-6 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-50"
              type="submit">Enviar
      </button>
    </form>
  )
}
