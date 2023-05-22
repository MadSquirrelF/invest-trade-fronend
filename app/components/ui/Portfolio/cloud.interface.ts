import { StaticImageData } from "next/image";

export interface ICloudItem {
  image: StaticImageData;
  title: string;
  ind: string;
}

export interface IClouds {
  clouds: ICloudItem[];
}
