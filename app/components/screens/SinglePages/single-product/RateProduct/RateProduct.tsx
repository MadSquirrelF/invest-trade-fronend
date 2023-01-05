import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { useRateProduct } from "./useRateProduct";
import styles from './RateProduct.module.scss'
import AuthButton from "@/components/ui/AuthPlaceholder/AuthButton";


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
              <h5>Рейтинг в разработке</h5>
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
