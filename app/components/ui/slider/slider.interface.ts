export interface ISlide {
  _id: string;
  title: string;
  poster: string;
  description_short: string;
  description_full: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  image_5: string;
  image_6: string;
  link: string;
}

export interface ISlider {
  slides: ISlide[];
  buttonTitle?: string;
}
