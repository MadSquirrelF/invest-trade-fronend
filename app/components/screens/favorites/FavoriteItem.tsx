import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Favorites.module.scss'
import { IFavoriteItem } from './favorites.interface'
import FavoriteButton from '@/components/ui/Shop/FavoriteButton/FavoriteButton'
import Button from '@/components/ui/form-elements/Button'
import MaterialIcon from '@/components/ui/MaterialIcon'

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.brand}>
        <Image src={item.logoPath} alt={item.name} priority draggable={false} width={90} height={50} />
      </div>
      <Link href={item.url}>
        <div className={styles.image}>
          <Image
            alt={item.name}
            src={item.posterPath}
            fill
            draggable={false}
            priority
          />
        </div>
      </Link>
      <h2>{item.title}</h2>

      <div className={styles.cart}>
        <div className={styles.productFunctions}>
          <FavoriteButton productId={item._id} />
          <Link href={item.url} className={styles.button}><MaterialIcon name='MdVisibility' /></Link>
          <div className={styles.button}><MaterialIcon name='MdAddShoppingCart' /></div>
        </div>

      </div>

    </div>
  )
}

export default FavoriteItem
