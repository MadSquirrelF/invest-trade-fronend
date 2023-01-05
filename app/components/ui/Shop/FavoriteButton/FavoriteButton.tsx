import { useFavorites } from '@/components/screens/favorites/useFavorites'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toastError'
import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import styles from './FavoriteButton.module.scss'
import HeartImage from './heart-animation.png'

const FavoriteButton: FC<{ productId: string }> = ({ productId }) => {

  const [isSmashed, setIsSmashed] = useState(false)

  const { favoritesProducts, refetch } = useFavorites()

  useEffect(() => {
    if (favoritesProducts) {
      const isHasProduct = favoritesProducts.some((p) => p._id === productId)
      if (isSmashed !== isHasProduct) setIsSmashed(isHasProduct)
    }
  }, [favoritesProducts, isSmashed, productId])

  const { mutateAsync } = useMutation(
    'update product added favorites',
    () => UserService.toggleFavorite(productId),
    {
      onError(error) {
        toastError(error, 'Ошибка обновления списка любимых товаров')
      },
      onSuccess() {
        setIsSmashed(!isSmashed)
        refetch()
      },
    }
  )

  return (
    <button
      onClick={() => mutateAsync()}
      className={cn(styles.button, {
        [styles.animate]: isSmashed,
      })}
      style={{ backgroundImage: `url(${HeartImage.src})` }}
    />
  )
}

export default FavoriteButton
