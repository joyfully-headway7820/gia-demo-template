import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

// Одно и то же тело используется при добавлении и при редактировании
export class SaveMaterialDto {
  @IsInt({ message: 'Выберите тип материала из списка' })
  @Min(1, { message: 'Выберите тип материала из списка' })
  @ApiProperty({ description: 'Номер типа материала', example: 1 })
  materialTypeId: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Наименование должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите наименование материала' })
  @MaxLength(150, { message: 'Наименование не должно быть длиннее 150 символов' })
  @ApiProperty({ description: 'Наименование', example: 'Соевый воск премиум' })
  materialName: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Цена должна быть числом с точностью до сотых' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @ApiProperty({ description: 'Цена единицы, не меньше 0, до сотых', example: 890.5 })
  unitPrice: number;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Единица измерения должна быть строкой' })
  @IsNotEmpty({ message: 'Укажите единицу измерения' })
  @MaxLength(20, { message: 'Единица измерения не должна быть длиннее 20 символов' })
  @ApiProperty({ description: 'Единица измерения', example: 'кг' })
  unit: string;

  @IsNumber({ maxDecimalPlaces: 3 }, { message: 'Количество в упаковке должно быть числом' })
  @Min(0.001, { message: 'Количество в упаковке должно быть больше нуля' })
  @ApiProperty({ description: 'Количество в упаковке, больше 0', example: 20 })
  packageQuantity: number;

  @IsNumber({ maxDecimalPlaces: 3 }, { message: 'Количество на складе должно быть числом' })
  @Min(0, { message: 'Количество на складе не может быть отрицательным' })
  @ApiProperty({ description: 'Количество на складе, не меньше 0', example: 120 })
  stockQuantity: number;

  @IsNumber({ maxDecimalPlaces: 3 }, { message: 'Минимальное количество должно быть числом' })
  @Min(0, { message: 'Минимальное количество не может быть отрицательным' })
  @ApiProperty({ description: 'Минимальное количество, не меньше 0', example: 40 })
  minQuantity: number;
}
