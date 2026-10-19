import { ApiError } from '../api/ApiError'

export function getErrorMessages(error: unknown): string[] {
  return error instanceof ApiError ? error.messages : ['Произошла непредвиденная ошибка. Повторите действие.']
}
