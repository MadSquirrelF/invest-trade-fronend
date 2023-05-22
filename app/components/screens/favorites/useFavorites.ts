import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';
import { useAuth } from '@/hooks/useAuth';
import { UserService } from '@/services/user.service';
import { toastError } from '@/utils/toastError';

export const useFavorites = () => {
  const { user } = useAuth();

  const {
    isLoading,
    data: favoritesProducts,
    refetch,
  } = useQuery(`Favorite products`, () => UserService.getFavorites(), {
    select: ({ data }) => data,
    enabled: !!user,
  });

  const { mutateAsync: deleteAsync } = useMutation(`delete favorites`, () => UserService.removeFavorite(), {
    onError: (error) => {
      toastError(error, `Удаление избранного`);
    },
    onSuccess: () => {
      toastr.success(`Удаление избранного`, `Избранное успешно удалено`);
      refetch();
    },
  });

  return {
    isLoading,
    favoritesProducts,
    refetch,
    deleteAsync,
  };
};
