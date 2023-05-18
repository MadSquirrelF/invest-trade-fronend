import OrderEdit from '@/components/screens/admin/order/OrderEdit';
import { NextPageAuth } from '@/shared/types/auth.types';

const OrderEditPage: NextPageAuth = () => <OrderEdit />;

OrderEditPage.isOnlyAdmin = true;

export default OrderEditPage;
