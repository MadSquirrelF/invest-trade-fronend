import Order from "@/components/screens/Porfile/Order/Order";
import { NextPageAuth } from "@/shared/types/auth.types";

const OrdersPage: NextPageAuth = () => <Order />;

OrdersPage.isOnlyUser = true;

export default OrdersPage;
