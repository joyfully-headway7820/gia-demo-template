import { ApiError } from './ApiError'

interface ErrorBody {
  message?: string | string[]
}

const DEFAULT_ERROR = 'Не удалось выполнить запрос. Повторите попытку позже.'
const SERVER_UNAVAILABLE = 'Сервер недоступен. Убедитесь, что бэкенд запущен, и повторите попытку.'

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`/api${path}`, { headers: { 'Content-Type': 'application/json' }, ...init })
  } catch {
    throw new ApiError([SERVER_UNAVAILABLE])
  }

  if (!response.ok) {
    const { message = DEFAULT_ERROR }: ErrorBody = (await response.json().catch(() => null)) ?? {}
    throw new ApiError(Array.isArray(message) ? message : [message])
  }
  return response.json()
}
