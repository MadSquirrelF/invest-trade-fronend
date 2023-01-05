export type CartItem = {
  id: string;
  title: string;
  count: number;
  imageUrl: string;
};

export interface CartSliceState {
  items: CartItem[];
}