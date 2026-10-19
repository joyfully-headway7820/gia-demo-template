import { type ChangeEvent, type SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getMaterial } from '../api/getMaterial'
import { getMaterialTypes } from '../api/getMaterialTypes'
import { saveMaterial } from '../api/saveMaterial'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { PageHeader } from '../components/PageHeader'
import { EMPTY_MATERIAL_FORM } from '../constants/materialForm'
import { INPUT_CLASS_NAME } from '../constants/styles'
import { confirmAction } from '../dialogs/confirmAction'
import { showError } from '../dialogs/showError'
import { showInfo } from '../dialogs/showInfo'
import { usePageTitle } from '../hooks/usePageTitle'
import type { MaterialFormValues } from '../types/MaterialFormValues'
import type { MaterialType } from '../types/MaterialType'
import { getErrorMessages } from '../utils/getErrorMessages'
import { toMaterialFormValues } from '../utils/toMaterialFormValues'
import { toMaterialPayload } from '../utils/toMaterialPayload'
import { validateMaterialForm } from '../utils/validateMaterialForm'

export function MaterialFormPage() {
  const { materialId } = useParams()
  const isEdit = materialId !== undefined
  const navigate = useNavigate()
  const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([])
  const [values, setValues] = useState<MaterialFormValues>(EMPTY_MATERIAL_FORM)
  const [savedValues, setSavedValues] = useState<MaterialFormValues>(EMPTY_MATERIAL_FORM)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  usePageTitle(isEdit ? 'Редактирование материала' : 'Добавление материала')

  const hasUnsavedChanges = JSON.stringify(values) !== JSON.stringify(savedValues)

  useEffect(() => {
    async function loadForm() {
      try {
        setMaterialTypes(await getMaterialTypes())
        if (materialId !== undefined) {
          const loadedValues = toMaterialFormValues(await getMaterial(Number(materialId)))
          setValues(loadedValues)
          setSavedValues(loadedValues)
        }
      } catch (error) {
        await showError('Не удалось открыть форму', getErrorMessages(error))
        navigate('/')
      } finally {
        setIsLoading(false)
      }
    }
    void loadForm()
  }, [materialId, navigate])

  const handleChange =
    (field: keyof MaterialFormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues({ ...values, [field]: event.target.value })

  // Уход со страницы теряет введённые данные, поэтому спрашиваем подтверждение
  async function leaveForm(path: string) {
    const canLeave =
      !hasUnsavedChanges ||
      (await confirmAction(
        'Есть несохранённые изменения',
        'Введённые данные не сохранены и будут потеряны. Уйти без сохранения?',
        'Уйти без сохранения',
      ))
    if (canLeave) navigate(path)
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const errors = validateMaterialForm(values)
    if (errors.length > 0) {
      await showError('Форма заполнена неверно', errors)
      return
    }

    setIsSaving(true)
    try {
      const { materialName } = await saveMaterial(toMaterialPayload(values), isEdit ? Number(materialId) : undefined)
      await showInfo(
        'Материал сохранён',
        `Материал «${materialName}» ${isEdit ? 'обновлён' : 'добавлен в список'}.`,
      )
      navigate('/')
    } catch (error) {
      await showError('Не удалось сохранить материал', getErrorMessages(error))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <PageHeader title={isEdit ? 'Редактирование материала' : 'Добавление материала'}>
        {isEdit && (
          <Button variant="secondary" onClick={() => leaveForm(`/materials/${materialId}/products`)}>
            Продукция
          </Button>
        )}
        <Button variant="secondary" onClick={() => leaveForm('/')}>
          Назад
        </Button>
      </PageHeader>
      <main className="mx-auto max-w-2xl p-6">
        {isLoading ? (
          <p>Загрузка формы…</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <FormField label="Тип материала">
              <select value={values.materialTypeId} onChange={handleChange('materialTypeId')} className={INPUT_CLASS_NAME}>
                <option value="">Выберите тип материала</option>
                {materialTypes.map(({ materialTypeId, materialTypeName }) => (
                  <option key={materialTypeId} value={materialTypeId}>
                    {materialTypeName}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Наименование">
              <input
                value={values.materialName}
                onChange={handleChange('materialName')}
                maxLength={150}
                placeholder="Например, Соевый воск премиум"
                className={INPUT_CLASS_NAME}
              />
            </FormField>
            <FormField label="Цена единицы материала, р" hint="Не меньше 0, до двух знаков после запятой">
              <input
                type="number"
                min="0"
                step="0.01"
                value={values.unitPrice}
                onChange={handleChange('unitPrice')}
                placeholder="450,00"
                className={INPUT_CLASS_NAME}
              />
            </FormField>
            <FormField label="Единица измерения">
              <input
                value={values.unit}
                onChange={handleChange('unit')}
                maxLength={20}
                placeholder="кг, л, шт, м"
                className={INPUT_CLASS_NAME}
              />
            </FormField>
            <FormField label="Количество в упаковке" hint="Больше 0">
              <input
                type="number"
                min="0"
                step="any"
                value={values.packageQuantity}
                onChange={handleChange('packageQuantity')}
                className={INPUT_CLASS_NAME}
              />
            </FormField>
            <FormField label="Количество на складе" hint="Не меньше 0">
              <input
                type="number"
                min="0"
                step="any"
                value={values.stockQuantity}
                onChange={handleChange('stockQuantity')}
                className={INPUT_CLASS_NAME}
              />
            </FormField>
            <FormField label="Минимальное количество" hint="Не может быть отрицательным">
              <input
                type="number"
                min="0"
                step="any"
                value={values.minQuantity}
                onChange={handleChange('minQuantity')}
                className={INPUT_CLASS_NAME}
              />
            </FormField>
            <Button type="submit" disabled={isSaving} className="self-start">
              {isSaving ? 'Сохранение…' : 'Сохранить'}
            </Button>
          </form>
        )}
      </main>
    </>
  )
}
