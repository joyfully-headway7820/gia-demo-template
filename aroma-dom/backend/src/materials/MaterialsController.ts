import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import type { MaterialType } from '../database/entities/MaterialType.js';
import { SaveMaterialDto } from './dto/SaveMaterialDto.js';
import type { MaterialProductView } from './MaterialProductView.js';
import type { MaterialView } from './MaterialView.js';
import { MaterialsService } from './MaterialsService.js';

@ApiTags('Материалы')
@Controller()
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get('material-types')
  @ApiOperation({ summary: 'Типы материалов для выпадающего списка' })
  findTypes(): Promise<MaterialType[]> {
    return this.materialsService.findTypes();
  }

  @Get('materials')
  @ApiOperation({ summary: 'Список материалов с требуемым количеством' })
  findAll(): Promise<MaterialView[]> {
    return this.materialsService.findAll();
  }

  @Get('materials/:id')
  @ApiOperation({ summary: 'Материал по номеру' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MaterialView> {
    return this.materialsService.findOne(id);
  }

  @Get('materials/:id/products')
  @ApiOperation({ summary: 'Продукция, в рецептуре которой есть материал' })
  findProducts(@Param('id', ParseIntPipe) id: number): Promise<MaterialProductView[]> {
    return this.materialsService.findProducts(id);
  }

  @Post('materials')
  @ApiOperation({ summary: 'Добавить материал' })
  create(@Body() dto: SaveMaterialDto): Promise<MaterialView> {
    return this.materialsService.create(dto);
  }

  @Put('materials/:id')
  @ApiOperation({ summary: 'Изменить материал' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: SaveMaterialDto): Promise<MaterialView> {
    return this.materialsService.update(id, dto);
  }
}
