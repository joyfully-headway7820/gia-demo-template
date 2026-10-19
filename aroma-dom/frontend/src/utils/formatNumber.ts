// Число в русском формате: 1 450,50. Дробная часть от minDigits до maxDigits знаков
export function formatNumber(value: number, minDigits = 0, maxDigits = 3): string {
  return value.toLocaleString('ru-RU', { minimumFractionDigits: minDigits, maximumFractionDigits: maxDigits })
}
