import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Material } from '../database/entities/Material.js';
import { MaterialProduct } from '../database/entities/MaterialProduct.js';
import { MaterialType } from '../database/entities/MaterialType.js';
import type { SaveMaterialDto } from './dto/SaveMaterialDto.js';
import type { MaterialProductView } from './MaterialProductView.js';
import type { MaterialView } from './MaterialView.js';
import { toMaterialView } from './toMaterialView.js';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material) private readonly materials: Repository<Material>,
    @InjectRepository(MaterialType) private readonly materialTypes: Repository<MaterialType>,
    @InjectRepository(MaterialProduct) private readonly materialProducts: Repository<MaterialProduct>,
  ) {}

  findTypes(): Promise<MaterialType[]> {
    return this.materialTypes.find({ order: { materialTypeName: 'ASC' } });
  }

  async findAll(): Promise<MaterialView[]> {
    const materials = await this.materials.find({
      relations: { materialType: true },
      order: { materialName: 'ASC' },
    });
    const requiredQuantities = await this.getRequiredQuantities();
    return materials.map((material) => toMaterialView(material, requiredQuantities.get(material.materialId) ?? 0));
  }

  async findOne(materialId: number): Promise<MaterialView> {
    const material = await this.getMaterial(materialId);
    const requiredQuantities = await this.getRequiredQuantities();
    return toMaterialView(material, requiredQuantities.get(materialId) ?? 0);
  }

  async findProducts(materialId: number): Promise<MaterialProductView[]> {
    await this.getMaterial(materialId);
    const recipes = await this.materialProducts.find({
      where: { materialId },
      relations: { product: true },
      order: { product: { productName: 'ASC' } },
    });
    return recipes.map(({ product, materialQuantity }) => ({
      productId: product.productId,
      productArticle: product.productArticle,
      productName: product.productName,
      materialQuantity,
    }));
  }

  async create(dto: SaveMaterialDto): Promise<MaterialView> {
    await this.checkSaveRules(dto);
    const { materialId } = await this.materials.save(this.materials.create(dto));
    return this.findOne(materialId);
  }

  async update(materialId: number, dto: SaveMaterialDto): Promise<MaterialView> {
    await this.getMaterial(materialId);
    await this.checkSaveRules(dto, materialId);
    await this.materials.update(materialId, dto);
    return this.findOne(materialId);
  }

  private async getMaterial(materialId: number): Promise<Material> {
    const material = await this.materials.findOne({
      where: { materialId },
      relations: { materialType: true },
    });
    if (!material) throw new NotFoundException(`Материал с номером ${materialId} не найден`);
    return material;
  }

  private async checkSaveRules({ materialTypeId, materialName }: SaveMaterialDto, materialId?: number): Promise<void> {
    if (!(await this.materialTypes.existsBy({ materialTypeId })))
      throw new BadRequestException('Выбранный тип материала не существует. Выберите тип из списка');

    const duplicateWhere = materialId ? { materialName, materialId: Not(materialId) } : { materialName };
    if (await this.materials.existsBy(duplicateWhere))
      throw new ConflictException(`Материал «${materialName}» уже есть в списке. Укажите другое наименование`);
  }

  // Требуемое количество = сумма расхода материала по всем рецептурам
  private async getRequiredQuantities(): Promise<Map<number, number>> {
    const rows = await this.materialProducts
      .createQueryBuilder('recipe')
      .select('recipe.materialId', 'materialId')
      .addSelect('SUM(recipe.materialQuantity)', 'total')
      .groupBy('recipe.materialId')
      .getRawMany<{ materialId: number; total: string }>();
    return new Map(rows.map(({ materialId, total }) => [materialId, Number(total)]));
  }
}
