import { NextPageAuth } from '@/shared/types/auth.types'
import dynamic from 'next/dynamic'
const DynamicFavorites = dynamic(() => import('../app/components/screens/favorites/Favorites'), {
  ssr: false,
})
const FavoritesPage: NextPageAuth = () => {
  return (
    <DynamicFavorites />
  )
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
