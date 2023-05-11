import dynamic from 'next/dynamic';
import { NextPageAuth } from '@/shared/types/auth.types';

const DynamicOrder = dynamic(() => import(`@/components/screens/Order/Orders`), { ssr: false });

const OrderPage: NextPageAuth = () => <DynamicOrder />;

OrderPage.isOnlyUser = true;

export default OrderPage;
