export type Category = {
  code: string,
  title: string,
  active: boolean,
}

export type ProductPrice = {
  currency: string,
  value: string
}

export type Product = {
  _id: string,
  active: boolean,
  images?: string[],
  title: string,
  description: string,
  category: string,
  price: ProductPrice,
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
  categories: Category[]
}
