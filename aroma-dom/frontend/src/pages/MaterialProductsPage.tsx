import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getMaterial } from '../api/getMaterial'
import { getMaterialProducts } from '../api/getMaterialProducts'
import { Button } from '../components/Button'
import { PageHeader } from '../components/PageHeader'
import { showError } from '../dialogs/showError'
import { usePageTitle } from '../hooks/usePageTitle'
import type { Material } from '../types/Material'
import type { MaterialProduct } from '../types/MaterialProduct'
import { formatNumber } from '../utils/formatNumber'
import { getErrorMessages } from '../utils/getErrorMessages'

export function MaterialProductsPage() {
  const { materialId } = useParams()
  const navigate = useNavigate()
  const [material, setMaterial] = useState<Material | null>(null)
  const [products, setProducts] = useState<MaterialProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  usePageTitle(material ? `Продукция: ${material.materialName}` : 'Продукция материала')

  useEffect(() => {
    const id = Number(materialId)
    Promise.all([getMaterial(id), getMaterialProducts(id)])
      .then(([loadedMaterial, loadedProducts]) => {
        setMaterial(loadedMaterial)
        setProducts(loadedProducts)
      })
      .catch((error) => showError('Не удалось загрузить продукцию', getErrorMessages(error)))
      .finally(() => setIsLoading(false))
  }, [materialId])

  return (
    <>
      <PageHeader title={material ? `Продукция: ${material.materialName}` : 'Продукция материала'}>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </PageHeader>
      <main className="mx-auto max-w-5xl p-6">
        {isLoading && <p>Загрузка списка продукции…</p>}
        {!isLoading && material && products.length === 0 && (
          <p>Этот материал пока не используется ни в одной рецептуре.</p>
        )}
        {material && products.length > 0 && (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-accent text-white">
                <th className="px-4 py-3">Артикул</th>
                <th className="px-4 py-3">Наименование продукции</th>
                <th className="px-4 py-3">Необходимое количество на единицу продукции</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ productId, productArticle, productName, materialQuantity }) => (
                <tr key={productId} className="border-b border-accent/20 even:bg-surface">
                  <td className="px-4 py-3">{productArticle}</td>
                  <td className="px-4 py-3">{productName}</td>
                  <td className="px-4 py-3">
                    {formatNumber(materialQuantity, 0, 4)} {material.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}
