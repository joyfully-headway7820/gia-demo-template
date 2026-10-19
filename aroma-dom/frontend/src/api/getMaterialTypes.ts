import type { MaterialType } from '../types/MaterialType'
import { apiRequest } from './apiRequest'

export function getMaterialTypes(): Promise<MaterialType[]> {
  return apiRequest<MaterialType[]>('/material-types')
}
