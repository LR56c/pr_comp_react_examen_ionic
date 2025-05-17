export const parseRuleMessage = ( rule: string ) => {
  switch ( rule ) {
    case "required":
      return "Este campo es obligatorio"
    case "date":
      return "El campo debe ser una fecha válida"
    default:
      return ""
  }
}
