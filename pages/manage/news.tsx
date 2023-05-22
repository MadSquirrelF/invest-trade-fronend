import NewList from '@/components/screens/admin/news/NewList';
import { NextPageAuth } from '@/shared/types/auth.types';

const NewsListPage: NextPageAuth = () => <NewList />;

NewsListPage.isOnlyAdmin = true;

export default NewsListPage;
