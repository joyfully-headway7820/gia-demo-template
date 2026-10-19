// Значения полей формы хранятся строками, чтобы пользователь мог набирать число постепенно
export interface MaterialFormValues {
  materialTypeId: string
  materialName: string
  unitPrice: string
  unit: string
  packageQuantity: string
  stockQuantity: string
  minQuantity: string
}
