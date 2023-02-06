
import { INewItem } from "@/components/ui/NewsMain/new.interface";
import { ISlide } from "@/components/ui/slider/slider.interface";
import { IAdds } from "@/shared/types/product.types";

export interface IHome {
  slides: ISlide[]
  Adds: IAdds[]
  news: INewItem[]
}