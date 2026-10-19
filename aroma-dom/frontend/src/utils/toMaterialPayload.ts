import type { MaterialFormValues } from '../types/MaterialFormValues'
import type { MaterialPayload } from '../types/MaterialPayload'
import { parseDecimal } from './parseDecimal'

export function toMaterialPayload(values: MaterialFormValues): MaterialPayload {
  return {
    materialTypeId: Number(values.materialTypeId),
    materialName: values.materialName.trim(),
    unitPrice: parseDecimal(values.unitPrice),
    unit: values.unit.trim(),
    packageQuantity: parseDecimal(values.packageQuantity),
    stockQuantity: parseDecimal(values.stockQuantity),
    minQuantity: parseDecimal(values.minQuantity),
  }
}
