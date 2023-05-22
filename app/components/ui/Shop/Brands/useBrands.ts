import { useQuery } from 'react-query';

import { toastError } from '@/utils/toastError';
import { BrandService } from '@/services/brand.service';

export interface IBrandItem {
  _id: string;
  name: string;
  image: string;
}
export const useBrands = () => {
  const queryData = useQuery(
    `get all brands `,
    () => BrandService.getAll(),
    {
      select: ({ data }) => data
        .map(
          (brand): IBrandItem => ({
            image: brand.logo_image,
            _id: brand._id,
            name: brand.name,
          }),
        )
        .splice(0, 4),
      onError(error) {
        toastError(error, `Ошибка получения брендов`);
      },
    },
  );

  return queryData;
};
