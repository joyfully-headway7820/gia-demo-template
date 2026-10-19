import type { Material } from '../types/Material'
import type { MaterialPayload } from '../types/MaterialPayload'
import { apiRequest } from './apiRequest'

// Без materialId материал создаётся, с materialId — обновляется
export function saveMaterial(payload: MaterialPayload, materialId?: number): Promise<Material> {
  const path = materialId ? `/materials/${materialId}` : '/materials'
  return apiRequest<Material>(path, { method: materialId ? 'PUT' : 'POST', body: JSON.stringify(payload) })
}
