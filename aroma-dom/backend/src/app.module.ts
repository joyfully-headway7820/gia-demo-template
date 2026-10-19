import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './database/getDataSourceOptions.js';
import { MaterialsModule } from './materials/MaterialsModule.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: () => getDataSourceOptions(process.env) }),
    MaterialsModule,
  ],
})
export class AppModule {}
