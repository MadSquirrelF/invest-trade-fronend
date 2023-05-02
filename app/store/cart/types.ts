export type CartItemType = {
  id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  url: string;
  count: number;
};

export interface CartSliceState {
  items: CartItemType[];
}
