import { TypeMaterialIconName } from "@/shared/types/icons.types";

export interface IIconItem {
  icon: TypeMaterialIconName;
  link: string;
}

export interface IIcon {
  items: IIconItem[];
}
