import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';
import { toastError } from '@/utils/toastError';
import { RatingService } from '@/services/rating.service';

export const useRateProduct = (productId: string) => {
  const [rating, setRating] = useState(0);
  const [isSended, setIsSended] = useState(false);

  const { refetch } = useQuery(
    [`your product rating`, productId],
    () => RatingService.getByUserProduct(String(productId)),
    {
      onSuccess({ data }) {
        setRating(data);
      },
      enabled: !!productId,
    },
  );

  const { mutateAsync: rateProduct } = useMutation(
    `set rating product`,
    ({ value }: { value: number }) => RatingService.setRating(productId, value),
    {
      onError(error) {
        toastError(error, `Оценка товара`);
      },
      onSuccess() {
        toastr.success(`Оценка товара`, `Вы успешно оценили товар`);

        setIsSended(true);
        refetch();

        setTimeout(() => {
          setIsSended(false);
        }, 2400);
      },
    },
  );

  const handleClick = async (nextValue: number) => {
    setRating(nextValue);
    await rateProduct({ value: nextValue });
  };

  return {
    isSended,
    rating,
    handleClick,
  };
};
