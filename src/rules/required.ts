import { Valid } from './validators'

export const isRequired = (message?: string): Valid => (value: any) => [
  'required',
  value === undefined && (message || true)
]
