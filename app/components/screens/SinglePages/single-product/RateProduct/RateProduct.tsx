import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { useRateProduct } from "./useRateProduct";
import styles from './RateProduct.module.scss'
import AuthButton from "@/components/ui/AuthPlaceholder/AuthButton";
import StarRatingComponent from 'react-star-rating-component';

const RateProduct: FC<{ slug: string; _id: string }> = ({ slug, _id }) => {
  const { user } = useAuth()
  const { handleClick, isSended, rating } = useRateProduct(_id)


  return (
    <div className={styles.wrapper}>
      <h3>Рекомендуете данный товар?</h3>
      <p>Рейтинг помогает улучшить рекомендации</p>

      {user ? (
        <>
          {isSended ? (
            <div className={styles.thanks}>Спасибо за отзыв!</div>
          ) : (
            <div>
              <StarRatingComponent
                name="star-rating"
                starCount={5}
                value={rating}
                onStarClick={handleClick}
                emptyStarColor="#4f4f4f"
              />
            </div>
          )}
        </>
      ) : (
        <AuthButton />
      )}
    </div>
  )
}

export default RateProduct
