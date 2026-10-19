import type { MaterialFormValues } from '../types/MaterialFormValues'
import { parseDecimal } from './parseDecimal'

function hasMoreDecimals(text: string, maxDecimals: number): boolean {
  const [, fraction = ''] = text.trim().replace(',', '.').split('.')
  return fraction.length > maxDecimals
}

// Возвращает список понятных пользователю ошибок; пустой список — форма заполнена верно
export function validateMaterialForm(values: MaterialFormValues): string[] {
  const errors: string[] = []
  const price = parseDecimal(values.unitPrice)
  const packageQuantity = parseDecimal(values.packageQuantity)
  const stockQuantity = parseDecimal(values.stockQuantity)
  const minQuantity = parseDecimal(values.minQuantity)

  if (!values.materialTypeId) errors.push('Выберите тип материала из выпадающего списка.')
  if (!values.materialName.trim()) errors.push('Укажите наименование материала.')
  if (!values.unit.trim()) errors.push('Укажите единицу измерения, например «кг», «л» или «шт».')

  if (Number.isNaN(price)) errors.push('Укажите цену единицы материала числом, например 450,00.')
  else if (price < 0) errors.push('Цена не может быть отрицательной. Введите значение от 0.')
  else if (hasMoreDecimals(values.unitPrice, 2)) errors.push('Цена указывается с точностью до сотых, например 450,25.')

  if (Number.isNaN(packageQuantity) || packageQuantity <= 0)
    errors.push('Укажите количество в упаковке числом больше нуля.')

  if (Number.isNaN(stockQuantity) || stockQuantity < 0)
    errors.push('Укажите количество на складе числом от 0.')

  if (Number.isNaN(minQuantity)) errors.push('Укажите минимальное количество числом, например 120.')
  else if (minQuantity < 0) errors.push('Минимальное количество не может быть отрицательным. Введите значение от 0.')

  return errors
}
