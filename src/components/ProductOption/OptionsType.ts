export type FieldsType = 'checkbox' | 'radio'

export type ProductOptionItem = {
  title: string,
  priceChange: string
}

export type ProductOptionType = {
  title: string,
  type: FieldsType,
  values: ProductOptionItem[]
}
