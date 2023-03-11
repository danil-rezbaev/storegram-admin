import { CategoryRounded, CreditCardRounded, SettingsRounded, ShoppingCartRounded, LocalMallRounded } from "@mui/icons-material";
import { ReactNode } from "react";

export type MenuItem = {
  code: string,
  title: string,
  icon: ReactNode
}

const menuItems: MenuItem[] = [
  {
    code: 'orders',
    title: 'Заказы',
    icon: <ShoppingCartRounded />
  },
  {
    code: 'products-list',
    title: 'Продукты',
    icon: <LocalMallRounded />
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
