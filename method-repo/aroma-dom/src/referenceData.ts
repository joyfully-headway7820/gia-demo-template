// Справочники из файлов импорта; идентификаторы совпадают с таблицами базы данных

export interface ProductType {
  productTypeId: number;
  productTypeName: string;
  productTypeCoefficient: number;
}

export interface MaterialType {
  materialTypeId: number;
  materialTypeName: string;
  // Процент потери сырья, 0.12 = 0,12%
  lossPercent: number;
}

export const PRODUCT_TYPES: ProductType[] = [
  { productTypeId: 1, productTypeName: 'Классическая свеча', productTypeCoefficient: 1 },
  { productTypeId: 2, productTypeName: 'Премиальная свеча', productTypeCoefficient: 1.15 },
  { productTypeId: 3, productTypeName: 'Подарочный набор', productTypeCoefficient: 1.3 },
  { productTypeId: 4, productTypeName: 'Интерьерная свеча', productTypeCoefficient: 1.2 },
  { productTypeId: 5, productTypeName: 'Мини-свеча', productTypeCoefficient: 0.8 },
  { productTypeId: 6, productTypeName: 'Сезонная коллекция', productTypeCoefficient: 1.25 },
];

export const MATERIAL_TYPES: MaterialType[] = [
  { materialTypeId: 1, materialTypeName: 'Соевый воск', lossPercent: 0.12 },
  { materialTypeId: 2, materialTypeName: 'Пчелиный воск', lossPercent: 0.18 },
  { materialTypeId: 3, materialTypeName: 'Ароматическое масло', lossPercent: 0.25 },
  { materialTypeId: 4, materialTypeName: 'Краситель', lossPercent: 0.08 },
  { materialTypeId: 5, materialTypeName: 'Фитиль', lossPercent: 0.03 },
  { materialTypeId: 6, materialTypeName: 'Стеклянная тара', lossPercent: 0.04 },
  { materialTypeId: 7, materialTypeName: 'Керамическая тара', lossPercent: 0.06 },
  { materialTypeId: 8, materialTypeName: 'Декор', lossPercent: 0.1 },
  { materialTypeId: 9, materialTypeName: 'Упаковка', lossPercent: 0.05 },
  { materialTypeId: 10, materialTypeName: 'Этикетка', lossPercent: 0.02 },
];
