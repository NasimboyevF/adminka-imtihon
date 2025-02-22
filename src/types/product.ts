export interface Product {
  _id: string; // Уникальный идентификатор
  name: string; // Название продукта
  description: string; // Описание продукта
  price: number; // Цена продукта
  discount: number; // Скидка на продукт
  colors: string[]; // Массив цветов (в формате HEX)
  type: string; // Тип продукта (например, "T-shirts")
  size: string; // Размер продукта
  dressStyle: string; // Стиль одежды (например, "Casual")
  pictures: string[]; // Массив URL изображений продукта
  __v: number; // Версия документа (MongoDB)
}
