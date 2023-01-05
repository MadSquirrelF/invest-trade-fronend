import { IAddItem } from "@/components/ui/Adds/addsContainer/add.interface";
import { INewItem } from "@/components/ui/NewsMain/new.interface";
import { ISlide } from "@/components/ui/slider/slider.interface";

export interface IHome {
  slides: ISlide[]
  Adds: IAddItem[]
  news: INewItem[]
}