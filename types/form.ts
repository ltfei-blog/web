export interface FormValidateError {
  values: Values
  errorFields: ErrorField[]
  outOfDate: boolean
}

interface ErrorField {
  name: string[]
  errors: string[]
  warnings: any[]
}

interface Values {
  title: string
  content: string
}
