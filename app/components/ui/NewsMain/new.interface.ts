export interface INewItem {
  _id: string
  image_1: string
  image_2?: string
  image_3?: string
  title: string
  description_short: string
  description_full: string
  link: string
  username: string
  createdAt: string
  countOpened: string
}

export interface INewItemProps {
  item: INewItem
}