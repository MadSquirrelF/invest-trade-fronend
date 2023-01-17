import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { useRateProduct } from "./useRateProduct";
import styles from './RateProduct.module.scss'
import AuthButton from "@/components/ui/AuthPlaceholder/AuthButton";
import { StarRating } from 'star-rating-react-ts'
import { colors } from "react-select/dist/declarations/src/theme";

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
              <StarRating numStars={5} initialRating={rating} onClick={handleClick}
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
