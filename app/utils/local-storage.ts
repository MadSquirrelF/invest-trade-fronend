import { CartItemType } from "@/store/cart/types";

export const getStoreLocal = (name: string) => {
  if (typeof localStorage !== `undefined`) {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};

export const getCartFromLS = () => {
  if (typeof localStorage !== `undefined`) {
    const data = localStorage.getItem(`cart`);
    const items = data ? JSON.parse(data) : [];
    return {
      items: items as CartItemType[],
    };
  }
  return {
    items: [] as CartItemType[],
  };
};
