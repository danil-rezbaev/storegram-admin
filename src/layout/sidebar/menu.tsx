import { PeopleAltRounded, StoreRounded, CategoryRounded, CreditCardRounded, SettingsRounded } from "@mui/icons-material";
import { ReactNode } from "react";

// const menuItems = [
//   'Заказы',
//   'Товары',
//   'Категории',
//   'Платежная система',
//   'Настройки',
// ]

export type MenuItem = {
  code: string,
  title: string,
  icon: ReactNode
}

const menuItems: MenuItem[] = [
  {
    code: 'orders',
    title: 'Заказы',
    icon: <PeopleAltRounded />
  },
  {
    code: 'products',
    title: 'Товары',
    icon: <StoreRounded />
  },
  {
    code: 'categories',
    title: 'Категории',
    icon: <CategoryRounded />
  },
  {
    code: 'payment',
    title: 'Платежная система',
    icon: <CreditCardRounded />
  },
  {
    code: 'settings',
    title: 'Настройки',
    icon: <SettingsRounded />
  }
]


export default menuItems
