import type { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Material } from './entities/Material.js';
import { MaterialProduct } from './entities/MaterialProduct.js';
import { MaterialType } from './entities/MaterialType.js';
import { Product } from './entities/Product.js';
import { ProductType } from './entities/ProductType.js';

export function getDataSourceOptions(env: NodeJS.ProcessEnv): DataSourceOptions {
  return {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port: Number(env.DB_PORT ?? 5432),
    database: env.DB_NAME ?? 'aroma_dom',
    username: env.DB_USER ?? 'postgres',
    password: env.DB_PASSWORD ?? 'postgres',
    entities: [MaterialType, ProductType, Material, Product, MaterialProduct],
    namingStrategy: new SnakeNamingStrategy(),
    // Схема создаётся по сущностям; для экзамена этого достаточно
    synchronize: true,
  };
}
