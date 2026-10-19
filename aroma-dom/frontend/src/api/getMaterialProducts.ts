import type { MaterialProduct } from '../types/MaterialProduct'
import { apiRequest } from './apiRequest'

export function getMaterialProducts(materialId: number): Promise<MaterialProduct[]> {
  return apiRequest<MaterialProduct[]>(`/materials/${materialId}/products`)
}
