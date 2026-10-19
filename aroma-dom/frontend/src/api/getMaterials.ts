import type { Material } from '../types/Material'
import { apiRequest } from './apiRequest'

export function getMaterials(): Promise<Material[]> {
  return apiRequest<Material[]>('/materials')
}
