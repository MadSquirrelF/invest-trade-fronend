import { StaticImageData } from "next/image";

export interface IGalleryShipItem {
  id: string
  text: string
  image: StaticImageData
}
export interface IGalleryShip {
  items: IGalleryShipItem[];
}