import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { ProductService } from '@/services/product.service';

export const useUpdateCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation(`update product count opened`, () => ProductService.updateCountOpened(slug));

  useEffect(() => {
    mutateAsync();
  }, []);
};
