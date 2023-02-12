import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
  title: 'Меню',
  items: [{
    link: '/',
    icon: 'MdHome',
    title: 'Главная',
    path: '/'
  }, {
    link: '/#about',
    icon: 'MdStoreMallDirectory',
    title: 'О компании',
    path: '/about'
  },
  {
    link: '/#portfolio',
    icon: 'MdBurstMode',
    title: 'Портфолио',
    path: '/work'
  },
  {
    link: '/#shop',
    icon: 'MdAddShoppingCart',
    title: 'Товар',
    path: '/product'
  },
  {
    link: '/#catalog',
    icon: 'MdChromeReaderMode',
    title: 'Каталог',
    path: '/catalog'
  },
  {
    link: '/#delivery',
    icon: 'MdLocalShipping',
    title: 'Доставка',
    path: '/delivery'
  },
  {
    link: '/#news',
    icon: 'MdArticle',
    title: 'Новости',
    path: '/new'
  },
  {
    link: '/#faq',
    icon: 'MdOutlineQuestionAnswer',
    title: 'Вопрос-ответ',
    path: '/faq'
  },
  {
    link: '/#footer',
    icon: 'MdContactPhone',
    title: 'Контакты',
    path: '/footer'
  },
  ]
}

