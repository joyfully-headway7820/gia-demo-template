import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getMaterials } from '../api/getMaterials'
import { Button } from '../components/Button'
import { MaterialCard } from '../components/MaterialCard'
import { PageHeader } from '../components/PageHeader'
import { showError } from '../dialogs/showError'
import { usePageTitle } from '../hooks/usePageTitle'
import type { Material } from '../types/Material'
import { getErrorMessages } from '../utils/getErrorMessages'

export function MaterialsPage() {
  usePageTitle('Материалы')
  const navigate = useNavigate()
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Список перезагружается при каждом возврате на страницу, поэтому после сохранения данные актуальны
  useEffect(() => {
    getMaterials()
      .then(setMaterials)
      .catch((error) => showError('Не удалось загрузить материалы', getErrorMessages(error)))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <PageHeader title="Материалы" showLogo>
        <Button onClick={() => navigate('/materials/new')}>Добавить материал</Button>
      </PageHeader>
      <main className="mx-auto flex max-w-5xl flex-col gap-4 p-6">
        {isLoading && <p>Загрузка списка материалов…</p>}
        {!isLoading && materials.length === 0 && <p>Материалов пока нет. Нажмите «Добавить материал».</p>}
        {materials.map((material) => (
          <MaterialCard
            key={material.materialId}
            material={material}
            onEdit={() => navigate(`/materials/${material.materialId}/edit`)}
            onShowProducts={() => navigate(`/materials/${material.materialId}/products`)}
          />
        ))}
      </main>
    </>
  )
}
