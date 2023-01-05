export interface IAddItem {
  imagePath: string
  title: string
  link: string
  price: number
}

export interface IAddItemProps {
  item: IAddItem
}