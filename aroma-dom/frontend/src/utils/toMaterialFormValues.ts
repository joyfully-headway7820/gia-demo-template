import type { Material } from '../types/Material'
import type { MaterialFormValues } from '../types/MaterialFormValues'

export function toMaterialFormValues(material: Material): MaterialFormValues {
  return {
    materialTypeId: String(material.materialTypeId),
    materialName: material.materialName,
    unitPrice: String(material.unitPrice),
    unit: material.unit,
    packageQuantity: String(material.packageQuantity),
    stockQuantity: String(material.stockQuantity),
    minQuantity: String(material.minQuantity),
  }
}
