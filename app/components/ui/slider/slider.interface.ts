export interface ISlide {
  _id: string
  title: string
  poster: string
  description: string
  link: string
}

export interface ISlider {
  slides: ISlide[]
  buttonTitle?: string
}