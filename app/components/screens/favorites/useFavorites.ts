import { useAuth } from '@/hooks/useAuth'
import { UserService } from '@/services/user.service'
import { useQuery } from 'react-query'


export const useFavorites = () => {

  const { user } = useAuth()

  const {
    isLoading,
    data: favoritesProducts,
    refetch,
  } = useQuery('Favorite products', () => UserService.getFavorites(), {
    select: ({ data }) => data,
    enabled: !!user
  })

  return { isLoading, favoritesProducts, refetch }
}
