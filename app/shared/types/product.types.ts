

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

export interface IWork {
  _id: string
  title: string
  slug: string
  poster: string
  description: string
  createdAt: string
  updatedAt: string
}


export interface IParametersProf {
  rang: number
  basic_profile_width: number
  count_cell: number
  accessories: string
  color: string
  double_glazed_window: number
  number_of_sealing_contours: number
}

export interface ILevelParams {
  warmInsulation: number
  soundInsulation: number
  lightInsulation: number
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

export interface IProduct {
  category: ICategory[]
  add: IAdds[]
  _id: string
  image: string
  logo_image: string
  title: string
  levelSetting: ILevelParams
  rating: number
  countOpened: number
  slug: string
  description_short: string
  description_full: string
  parameters: IParametersProf
  isSendTelegram?: boolean
}
