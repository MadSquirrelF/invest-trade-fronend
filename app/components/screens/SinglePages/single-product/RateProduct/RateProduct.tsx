import { FC } from "react";
import { StarRating } from 'star-rating-react-ts';
import { useAuth } from "@/hooks/useAuth";
import { useRateProduct } from "./useRateProduct";
import styles from './RateProduct.module.scss';
import AuthButton from "@/components/ui/AuthPlaceholder/AuthButton";

const RateProduct: FC<{ _id: string }> = ({ _id }) => {
  const { user } = useAuth();
  const { handleClick, isSended, rating } = useRateProduct(_id);

  return (
    <div className={styles.wrapper}>
      <h3>Рекомендуете данный товар?</h3>
      <p>Рейтинг помогает улучшить рекомендации</p>

      {user ? (isSended ? (
        <div className={styles.thanks}>Спасибо за отзыв!</div>
      ) : (
        <div>
          <StarRating
            numStars={5}
            initialRating={rating}
            onClick={handleClick}
          />
        </div>
      )
      ) : (
        <AuthButton />
      )}
    </div>
  );
};

export default RateProduct;
