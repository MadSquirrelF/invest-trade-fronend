export interface IMenuItem {
  title: string;
  link: string;
  path: string;
}

export interface IMenu {
  title: string;
  items: IMenuItem[];
}