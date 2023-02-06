import { FC } from 'react'
import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'
import Meta from '@/utils/meta/Meta'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import { getProductUrl } from 'config/url.config'

const Favorites: FC = () => {
  const { favoritesProducts, isLoading } = useFavorites()

  return (
    <Meta title="Избранное">
      <section className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Ваши  <br />
              <span>избранные товары</span>
            </h1>
          </div>
          <p>Здесь собраны ваши сохранненые товары,
            которые вы сможете заказать в один клик!</p>
          <div className={styles.wrapper}>


            {isLoading ? (
              <SkeletonLoader
                count={3}
                className={styles.skeletonLoader}
                containerClassName={styles.containerLoader}
              />
            ) : (
              favoritesProducts?.map((product) => (
                <FavoriteItem
                  key={product._id}
                  item={{
                    name: product.title,
                    posterPath: product.image,
                    url: getProductUrl(product.slug),
                    title: product.title,
                    _id: product._id,
                    logoPath: product.brand[0].logo_image
                  }}
                />
              ))
            )}
          </div>



        </div>



      </section>
    </Meta>
  )
}

export default Favorites
