import { FC } from 'react'
import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'
import Meta from '@/utils/meta/Meta'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import { getProductUrl } from 'config/url.config'
import Image from 'next/image'
import emptyWishlist from '@/assets/images/commons/emptyWishlist.jpg'
import MaterialIcon from '@/components/ui/MaterialIcon'
import Link from 'next/link'
import Button from '@/components/ui/form-elements/Button'
import FavoritesEmpty from './FavoritesEmpty/FavoritesEmpty'

const Favorites: FC = () => {

  const { favoritesProducts, isLoading, deleteAsync } = useFavorites()

  if (favoritesProducts?.length === 0) {
    return <FavoritesEmpty/>
  }

  return (
    <Meta title="Избранное">
      <section className={styles.favorites}>
        <div className={styles.container}>
          <div className={styles.top}>
            <h2 className={styles.title}>
              <MaterialIcon name='MdFavorite'/>
              Избранное
            </h2>
            <div className={styles.clearPage} onClick={() => deleteAsync()}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 5H4.16667H17.5"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path
                d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path
                d="M8.33337 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path
                d="M11.6666 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>

            <span>Очистить избранное</span>
            </div>
          </div>
          <div className={styles.items}>
            {
              isLoading ? (
                <SkeletonLoader
                count={3}
                className={styles.skeletonLoader}
                containerClassName={styles.containerLoader}
              />
              ) : favoritesProducts?.length ? (favoritesProducts.map((product) => (
                <FavoriteItem
                key={product._id}
                item={{
                  name: product.title,
                  image: product.image,
                  url: getProductUrl(product.slug),
                  _id: product._id,
                  brand: product.brand[0].name,
                  category: product.category[0].name
                }}
              />
              ))) : (<div className={styles.emptyWishlist}>
                <Image src={emptyWishlist} alt={'emptyWishlist'} draggable={false} height={300} width={500} />
              </div>)
            }
          </div>
          <div className={styles.bottom}>
            <div className={styles.details}>
              <span>
         
              Всего товара: <b>{favoritesProducts?.length} шт.</b>
              </span>
              <span>
              {' '}
              Добавить весь список в корзину? {' '}
            </span>
            </div>
            <div className={styles.actions}>
              <Link href={'/'} className={styles.return}>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>

              <span>Вернуться назад</span>
              </Link>
              <Button>
                Перенести в корзину
              </Button>
            </div>
          </div>
          
          


        </div>



      </section>
    </Meta>
  )
}

export default Favorites

