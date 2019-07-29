export type Valid = (
  value: string
) => [string, string | boolean, string?] | null

export interface IError {
  type: string
  error: string | IError
  ref?: string
}

export const validators = (valid: Valid, errors: any, value: any): IError[] => {
  const validResult = valid(value)
  if (!validResult) {
    return errors
  }
  const [name, error, ref] = validResult
  return error
    ? [
        ...(errors || []),
        {
          error,
          type: name,
          ...(ref ? { ref } : {})
        }
      ]
    : errors
}
