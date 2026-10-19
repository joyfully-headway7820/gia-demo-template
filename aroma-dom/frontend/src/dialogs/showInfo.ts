import { appDialog } from './appDialog'

export function showInfo(title: string, text: string): Promise<unknown> {
  return appDialog.fire({ icon: 'info', title, text })
}
