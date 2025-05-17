import { ComponentPropsWithoutRef, type FC, useRef, useState } from "react"
import {
  useValidation
}                                                              from "react-simple-form-validator"
import Form
                                                       from "react-bootstrap/Form"
import { Button }                                      from "react-bootstrap"
import {
  parseRuleMessage
}                                                      from "../utils/parse_error_messages"


interface AddProductProps extends ComponentPropsWithoutRef<"form"> {
  onAddProduct: ( name: string, price: number, image: File ) => void
}

export const AddProduct: FC<AddProductProps> = ( {
  onAddProduct,
  className,
  ...props
} ) => {
  const [name, setName]           = useState( "" )
  const [price, setPrice]         = useState( 0 )
  const [image, setImage]         = useState<File | null>( null )
  const [isTouched, setIsTouched] = useState( false )
  const [isLoading, setIsLoading] = useState( false )
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isFormValid, getFailedRulesInField } = useValidation( {
    fieldsRules: {
      name : { required: true },
      price: { required: true },
      image: { required: true }
    },
    state      : { name, price }
  } )

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( !isTouched ) {
      setIsTouched( true )
    }
    if ( !isFormValid ) {
      return
    }
    setIsLoading( true )
    onAddProduct( name, price, image! )
    setIsLoading( false )
    setName( "" )
    setPrice( 0 )
    setImage( null )
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsTouched( false )
  }

  return (
    <form
      className={ `flex flex-col gap-4 w-full ${ className }` } { ...props }
      onSubmit={ handleSubmit }>
      <div className="flex flex-col">
        <Form.Label htmlFor="name">Nombre producto</Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={ name }
          onChange={ ( e ) => {
            setName( e.target.value )
            setIsTouched( true )
          } }
        />
        { isTouched ? getFailedRulesInField( "name" ).map( ( error, index ) => (
          <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                key={ index }>{ parseRuleMessage( error ) }</span>
        ) ) : null }
      </div>
      <div className="flex flex-col">
        <Form.Label htmlFor="price">Precio</Form.Label>
        <Form.Control
          type="number"
          id="price"
          value={ price }
          onChange={ ( e ) => {
            setPrice( Number( e.target.value ) )
            setIsTouched( true )
          } }
        />
        { isTouched ? getFailedRulesInField( "price" )
          .map( ( error, index ) => (
            <span className="mt-2 text-sm text-red-600 dark:text-red-500"
                  key={ index }>{ parseRuleMessage( error ) }</span>
          ) ) : null }
      </div>
      <div className="flex flex-col">
        <Form.Label>Imagen del producto:</Form.Label>
        <Form.Control
          multiple={ false }
          accept="image/*"
          ref={ fileInputRef }
          type="file" onChange={ ( e ) => {
          const file = e.target.files?.[0]
          if ( file ) {
            setImage( file )
            setIsTouched( true )
          }
        } }/>
        { isTouched ? getFailedRulesInField( "image" )
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
  )
}
