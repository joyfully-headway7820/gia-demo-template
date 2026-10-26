import { MATERIAL_TYPES, PRODUCT_TYPES } from './referenceData.js';

const INVALID_RESULT = -1;

function isPositiveNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

/**
 * Количество продукции, которое получится из заданного количества сырья.
 *
 * Сырья на единицу продукции = параметр 1 * параметр 2 * коэффициент типа продукции.
 * Из количества сырья вычитается процент потерь для типа материала.
 * Возвращает целое число или -1, если типы не найдены или данные некорректны.
 */
export function calculateProductCount(
  productTypeId: number,
  materialTypeId: number,
  rawMaterialQuantity: number,
  firstParam: number,
  secondParam: number,
): number {
  const hasValidIntegers =
    Number.isInteger(productTypeId) && Number.isInteger(materialTypeId) && Number.isInteger(rawMaterialQuantity);
  if (!hasValidIntegers || rawMaterialQuantity < 0) return INVALID_RESULT;
  if (!isPositiveNumber(firstParam) || !isPositiveNumber(secondParam)) return INVALID_RESULT;

  const productType = PRODUCT_TYPES.find((type) => type.productTypeId === productTypeId);
  const materialType = MATERIAL_TYPES.find((type) => type.materialTypeId === materialTypeId);
  if (!productType || !materialType) return INVALID_RESULT;

  const materialPerProduct = firstParam * secondParam * productType.productTypeCoefficient;
  const usableMaterial = rawMaterialQuantity * (1 - materialType.lossPercent / 100);

  return Math.floor(usableMaterial / materialPerProduct);
}
