import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { getDataSourceOptions } from '../getDataSourceOptions.js';
import { Material } from '../entities/Material.js';
import { MaterialProduct } from '../entities/MaterialProduct.js';
import { MaterialType } from '../entities/MaterialType.js';
import { Product } from '../entities/Product.js';
import { ProductType } from '../entities/ProductType.js';
import { parseNumber } from './parseNumber.js';
import { readSheet } from './readSheet.js';

// Запуск: npm run seed [папка с csv], по умолчанию ../import
process.loadEnvFile();
const importDir = process.argv[2] ?? join(process.cwd(), '..', 'import');
const sheet = (name: string) =>
  readSheet(join(importDir, `АД_${name}_import.csv`));

// Ищет id по имени и сообщает, если в файлах есть ссылка на несуществующую запись
function findId(
  ids: Map<string, number>,
  name: string,
  entityTitle: string,
): number {
  const id = ids.get(name);
  if (id === undefined)
    throw new Error(`${entityTitle} «${name}» не найден(а) в данных импорта`);
  return id;
}

const dataSource = new DataSource(getDataSourceOptions(process.env));
await dataSource.initialize();

await dataSource.transaction(async (manager) => {
  await manager.query(
    'TRUNCATE material_product, product, material, product_type, material_type RESTART IDENTITY CASCADE',
  );

  const materialTypes = await manager.save(
    MaterialType,
    (await sheet('Material_type')).map(([materialTypeName, loss]) => ({
      materialTypeName,
      lossPercent: parseNumber(loss, 2),
    })),
  );
  const materialTypeIds = new Map(
    materialTypes.map(({ materialTypeName, materialTypeId }) => [
      materialTypeName,
      materialTypeId,
    ]),
  );

  const productTypes = await manager.save(
    ProductType,
    (await sheet('Product_type')).map(([productTypeName, coefficient]) => ({
      productTypeName,
      productTypeCoefficient: parseNumber(coefficient, 2),
    })),
  );
  const productTypeIds = new Map(
    productTypes.map(({ productTypeName, productTypeId }) => [
      productTypeName,
      productTypeId,
    ]),
  );

  const materials = await manager.save(
    Material,
    (await sheet('Materials')).map(
      ([materialName, typeName, price, stock, min, packageQuantity, unit]) => ({
        materialName,
        materialTypeId: findId(materialTypeIds, typeName, 'Тип материала'),
        unitPrice: parseNumber(price, 2),
        stockQuantity: parseNumber(stock, 3),
        minQuantity: parseNumber(min, 3),
        packageQuantity: parseNumber(packageQuantity, 3),
        unit,
      }),
    ),
  );
  const materialIds = new Map(
    materials.map(({ materialName, materialId }) => [materialName, materialId]),
  );

  const products = await manager.save(
    Product,
    (await sheet('Products')).map(
      ([productArticle, typeName, productName, price]) => ({
        productArticle,
        productName,
        productTypeId: findId(productTypeIds, typeName, 'Тип продукции'),
        minPartnerPrice: parseNumber(price, 2),
      }),
    ),
  );
  const productIds = new Map(
    products.map(({ productName, productId }) => [productName, productId]),
  );

  await manager.save(
    MaterialProduct,
    (await sheet('Material_products')).map(
      ([materialName, productName, quantity]) => ({
        materialId: findId(materialIds, materialName, 'Материал'),
        productId: findId(productIds, productName, 'Продукция'),
        materialQuantity: parseNumber(quantity, 4),
      }),
    ),
  );

  console.log(
    `Импортировано: типов материалов ${materialTypes.length}, типов продукции ${productTypes.length}, ` +
      `материалов ${materials.length}, продукции ${products.length}, рецептур ${await manager.count(MaterialProduct)}`,
  );
});

await dataSource.destroy();
