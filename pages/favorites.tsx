import dynamic from 'next/dynamic';
import { NextPageAuth } from '@/shared/types/auth.types';

const DynamicFavorites = dynamic(() => import(`../app/components/screens/favorites/Favorites`), {
  ssr: false,
});
const FavoritesPage: NextPageAuth = () => (
  <DynamicFavorites />
);

FavoritesPage.isOnlyUser = true;

export default FavoritesPage;
