import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from '../database/entities/Material.js';
import { MaterialProduct } from '../database/entities/MaterialProduct.js';
import { MaterialType } from '../database/entities/MaterialType.js';
import { MaterialsController } from './MaterialsController.js';
import { MaterialsService } from './MaterialsService.js';

@Module({
  imports: [TypeOrmModule.forFeature([Material, MaterialType, MaterialProduct])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
