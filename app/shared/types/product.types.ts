

export interface INew {
  _id: string
  title: string
  slug: string
  image_1: string
  image_2?: string
  image_3?: string
  description_short: string
  description_full: string
  username: string
  createdAt: string
  updatedAt: string
  countOpened: string
  isSendTelegram?: boolean
}

export interface IBrand {
  _id: string
  name: string
  slug: string
  description: string
  logo_image: string
}

export interface IWork {
  _id: string
  title: string
  slug: string
  poster: string
  description: string
  createdAt: string
  updatedAt: string
}


export interface Settings {
  name: string
  value: string
}

export interface IAdds {
  _id: string
  photo: string
  name: string
  price: number
  slug: string
}

export interface ICategory {
  _id: string
  name: string
  slug: string
  description: string
  image: string
}

export interface IGetProducts {
  data: IProduct[]
  total: number
  pageOf: number
  last_page: number
}

export interface IProduct {
  category: ICategory[]
  add: IAdds[]
  _id: string
  is_available: boolean
  count_on_store: number
  image: string
  brand: IBrand[]
  details: Settings[]
  title: string
  rating: number
  countOpened: number
  slug: string
  description_short: string
  description_full: string
  isSendTelegram?: boolean
}
