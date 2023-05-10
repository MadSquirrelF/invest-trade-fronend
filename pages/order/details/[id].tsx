import OrderEdit from '@/components/screens/Porfile/Order/OrderEdit';
import { NextPageAuth } from '@/shared/types/auth.types';

const OrderEditPage: NextPageAuth = () => <OrderEdit />;

OrderEditPage.isOnlyUser = true;

export default OrderEditPage;
