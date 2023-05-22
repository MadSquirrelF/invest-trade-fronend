import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { NewService } from '@/services/new.service';

export const useUpdateCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation(`update new count view`, () => NewService.updateCountOpened(slug));

  useEffect(() => {
    mutateAsync();
  }, []);
};
