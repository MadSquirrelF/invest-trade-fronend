import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DynamicCart = dynamic(() => import(`../app/components/screens/cart/Cart`), { ssr: false });

const CartPage: NextPage = () => (
  <DynamicCart />
);

export default CartPage;
