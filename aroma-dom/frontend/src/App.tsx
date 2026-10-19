import { Navigate, Route, Routes } from 'react-router'
import { MaterialFormPage } from './pages/MaterialFormPage'
import { MaterialProductsPage } from './pages/MaterialProductsPage'
import { MaterialsPage } from './pages/MaterialsPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MaterialsPage />} />
      <Route path="/materials/new" element={<MaterialFormPage />} />
      <Route path="/materials/:materialId/edit" element={<MaterialFormPage />} />
      <Route path="/materials/:materialId/products" element={<MaterialProductsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
