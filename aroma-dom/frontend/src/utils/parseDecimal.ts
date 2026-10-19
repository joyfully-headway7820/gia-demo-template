// Принимает и «1.5», и «1,5»; пустая или некорректная строка даёт NaN
export function parseDecimal(text: string): number {
  const normalized = text.trim().replace(',', '.')
  return normalized === '' ? NaN : Number(normalized)
}
