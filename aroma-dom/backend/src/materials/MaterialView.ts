export interface MaterialView {
  materialId: number;
  materialTypeId: number;
  materialTypeName: string;
  materialName: string;
  unitPrice: number;
  unit: string;
  packageQuantity: number;
  stockQuantity: number;
  minQuantity: number;
  // Сумма расхода материала на единицу каждой продукции, где он используется
  requiredQuantity: number;
}
