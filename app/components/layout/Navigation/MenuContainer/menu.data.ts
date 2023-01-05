import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
  title: 'Меню',
  items: [{
    link: '/',
    title: 'Главная',
    path: '/'
  }, {
    link: '/#about',
    title: 'О компании',
    path: '/about'
  },
  {
    link: '/#portfolio',
    title: 'Портфолио',
    path: '/work'
  },
  {
    link: '/#shop',
    title: 'Товар',
    path: '/product'
  },
  {
    link: '/#catalog',
    title: 'Каталог',
    path: '/catalog'
  },
  {
    link: '/#delivery',
    title: 'Доставка',
    path: '/delivery'
  },
  {
    link: '/#news',
    title: 'Новости',
    path: '/new'
  },
  {
    link: '/#faq',
    title: 'Вопрос-ответ',
    path: '/faq'
  },
  {
    link: '/#footer',
    title: 'Контакты',
    path: '/footer'
  },
  ]
}

