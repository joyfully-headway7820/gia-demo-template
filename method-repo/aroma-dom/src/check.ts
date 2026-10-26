import { calculateProductCount } from "./calculateProductCount.js";

// Ручная проверка метода: npm run check
const cases: { title: string; actual: number; expected: number }[] = [
  {
    title: "Классическая свеча, соевый воск, 1000 кг, 0.5 x 0.4",
    actual: calculateProductCount(1, 1, 1000, 0.5, 0.4),
    expected: 4994,
  },
  {
    title: "Подарочный набор: коэффициент 1.3",
    actual: calculateProductCount(3, 2, 500, 0.5, 0.4),
    expected: 1919,
  },
  {
    title: "Сырья не хватает даже на одну единицу",
    actual: calculateProductCount(1, 1, 0, 0.5, 0.4),
    expected: 0,
  },
  {
    title: "Несуществующий тип продукции",
    actual: calculateProductCount(99, 1, 100, 1, 1),
    expected: -1,
  },
  {
    title: "Несуществующий тип материала",
    actual: calculateProductCount(1, 99, 100, 1, 1),
    expected: -1,
  },
  {
    title: "Отрицательное количество сырья",
    actual: calculateProductCount(1, 1, -5, 1, 1),
    expected: -1,
  },
  {
    title: "Нулевой параметр продукции",
    actual: calculateProductCount(1, 1, 100, 0, 1),
    expected: -1,
  },
  {
    title: "Дробное количество сырья",
    actual: calculateProductCount(1, 1, 10.5, 1, 1),
    expected: -1,
  },
];

for (const { title, actual, expected } of cases)
  console.log(
    `${actual === expected ? "OK  " : "FAIL"} ${title}: получено ${actual}, ожидалось ${expected}`,
  );
