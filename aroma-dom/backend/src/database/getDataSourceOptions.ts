import type { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as entities from './entities/index.js';

export function getDataSourceOptions(
  env: NodeJS.ProcessEnv,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port: Number(env.DB_PORT ?? 5432),
    database: env.DB_NAME ?? 'aroma_dom',
    username: env.DB_USER ?? 'postgres',
    password: env.DB_PASSWORD ?? 'postgres',
    entities: Object.values(entities),
    namingStrategy: new SnakeNamingStrategy(),
    // Схема создаётся по сущностям; для экзамена этого достаточно
    synchronize: true,
  };
}
