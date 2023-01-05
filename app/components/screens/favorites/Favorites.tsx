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
      <section className={styles.favorites}>
        <h1>Избранное</h1>

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
              }}
            />
          ))
        )}
      </section>
    </Meta>
  )
}

export default Favorites
