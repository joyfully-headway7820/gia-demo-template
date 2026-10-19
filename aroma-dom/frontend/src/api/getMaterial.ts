import type { Material } from '../types/Material'
import { apiRequest } from './apiRequest'

export function getMaterial(materialId: number): Promise<Material> {
  return apiRequest<Material>(`/materials/${materialId}`)
}
