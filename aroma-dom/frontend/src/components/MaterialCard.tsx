import type { Material } from '../types/Material'
import { formatNumber } from '../utils/formatNumber'
import { Button } from './Button'

interface MaterialCardProps {
  material: Material
  onEdit: () => void
  onShowProducts: () => void
}

export function MaterialCard({ material, onEdit, onShowProducts }: MaterialCardProps) {
  const { materialTypeName, materialName, minQuantity, stockQuantity, unitPrice, unit, requiredQuantity } = material

  return (
    <article
      onClick={onEdit}
      className="flex cursor-pointer flex-wrap items-center justify-between gap-4 rounded-lg border border-accent/30 bg-surface p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">
          {materialTypeName} | {materialName}
        </h2>
        <p>
          Минимальное количество: {formatNumber(minQuantity)} {unit}
        </p>
        <p>
          Количество на складе: {formatNumber(stockQuantity)} {unit}
        </p>
        <p>
          Цена: {formatNumber(unitPrice, 2, 2)} р / Единица измерения: {unit}
        </p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <p className="text-lg font-bold text-accent">
          Требуемое количество: {formatNumber(requiredQuantity, 2, 2)} {unit}
        </p>
        <Button
          variant="secondary"
          onClick={(event) => {
            // Карточка целиком открывает редактирование, кнопка ведёт на другое окно
            event.stopPropagation()
            onShowProducts()
          }}
        >
          Продукция
        </Button>
      </div>
    </article>
  )
}
