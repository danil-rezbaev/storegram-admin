import { Category } from "../pages/Categories/CategoriesTypes";
import { ProductOptionType } from "../components/ProductOption/OptionsType";

export type ProductPrice = {
  currency: string,
  value: string
}

export type Product = {
  _id: string,
  active: boolean,
  images: string[],
  title: string,
  description: string,
  category: string,
  price: number,
  options?: ProductOptionType[]
}

export type OrderProduct = Product & {
  count: number
}

export type StoreShort = {
  _id?: any,
  id: string,
  title: string,
}

export type Store = {
  title: string,
  products: Product[],
  currency: string,
  categories: Category[],
}
