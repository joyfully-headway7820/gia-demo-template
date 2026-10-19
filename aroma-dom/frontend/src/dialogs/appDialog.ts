import Swal from 'sweetalert2'

export const appDialog = Swal.mixin({
  confirmButtonColor: '#8A5A44',
  cancelButtonColor: '#6b7280',
  confirmButtonText: 'Понятно',
  cancelButtonText: 'Отмена',
})
