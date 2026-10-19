import type { Material } from '../database/entities/Material.js';
import type { MaterialView } from './MaterialView.js';
import { roundToHundredths } from './roundToHundredths.js';

export function toMaterialView(material: Material, requiredQuantity: number): MaterialView {
  return {
    materialId: material.materialId,
    materialTypeId: material.materialTypeId,
    materialTypeName: material.materialType.materialTypeName,
    materialName: material.materialName,
    unitPrice: material.unitPrice,
    unit: material.unit,
    packageQuantity: material.packageQuantity,
    stockQuantity: material.stockQuantity,
    minQuantity: material.minQuantity,
    requiredQuantity: roundToHundredths(requiredQuantity),
  };
}
