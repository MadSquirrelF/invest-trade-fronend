import BrandEdit from '@/components/screens/admin/brand/BrandEdit';
import { NextPageAuth } from '@/shared/types/auth.types';

const BrandEditPage: NextPageAuth = () => <BrandEdit />;

BrandEditPage.isOnlyAdmin = true;

export default BrandEditPage;
