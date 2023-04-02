export type FieldsType = 'checkbox' | 'radio'

export type ProductOptionItem = {
  id: string,
  title: string,
  priceChange: number
}

export type ProductOptionType = {
  id: string,
  title: string,
  optionType: FieldsType,
  values: ProductOptionItem[]
}
