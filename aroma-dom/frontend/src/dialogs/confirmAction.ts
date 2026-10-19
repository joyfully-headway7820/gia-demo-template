import { appDialog } from './appDialog'

// Предупреждение перед действием, которое нельзя отменить
export async function confirmAction(title: string, text: string, confirmButtonText: string): Promise<boolean> {
  const { isConfirmed } = await appDialog.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText,
    showCancelButton: true,
    reverseButtons: true,
    focusCancel: true,
  })
  return isConfirmed
}
