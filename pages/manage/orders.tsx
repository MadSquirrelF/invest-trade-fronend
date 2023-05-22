import OrderList from '@/components/screens/admin/orders/OrderList';
import { NextPageAuth } from '@/shared/types/auth.types';

const OrderListPage: NextPageAuth = () => <OrderList />;

OrderListPage.isOnlyAdmin = true;

export default OrderListPage;
