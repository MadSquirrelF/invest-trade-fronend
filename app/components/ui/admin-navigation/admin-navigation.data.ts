import { getAdminHomeUrl, getAdminUrl } from "config/url.config";
import { INavItem } from "./admin-navigation.interface";

export const navItems: INavItem[] = [
  {
    title: 'Статистика',
    link: getAdminHomeUrl()
  },
  {
    title: 'Пользователи',
    link: getAdminUrl('users')
  },
  {
    title: 'Товар',
    link: getAdminUrl('products')
  },
  {
    title: 'Дополнения',
    link: getAdminUrl('adds')
  },
  {
    title: 'Категории',
    link: getAdminUrl('categories')
  },
  {
    title: 'Бренд',
    link: getAdminUrl('brands')
  },
  {
    title: 'Новости',
    link: getAdminUrl('news')
  },
  {
    title: 'Портфолио',
    link: getAdminUrl('works')
  },
]