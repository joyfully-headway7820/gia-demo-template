import { appDialog } from './appDialog'

export function showError(title: string, messages: string[]): Promise<unknown> {
  return appDialog.fire({ icon: 'error', title, text: messages.join('\n') })
}
