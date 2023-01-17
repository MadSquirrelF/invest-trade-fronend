import { ProductService } from '@/services/product.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { IProduct } from '@/shared/types/product.types'
import cn from 'classnames'
import styles from '../Admin.module.scss'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import { getProductUrl } from '../../../../../config/url.config'
import Link from 'next/link'
import Image from 'next/image'
import MaterialIcon from '@/components/ui/MaterialIcon'
const PopularProducts: FC = () => {

  const { isLoading, data: products } = useQuery('Most popular product in admin', () => ProductService.getMostPopularProducts(), {
    select: (data): IProduct => data[0],
  })
  return <div className={cn(styles.block, styles.popular)}>
    <div>
      {isLoading ? (<SkeletonLoader className='h-48' />) : (products && <>
        <Link href={getProductUrl(products.slug)}>
          <Image width={200} height={200} src={products.image} alt={products.title} className={styles.image} priority />
        </Link>
        <h2>{products.title}</h2>
        <div className={styles.view}>
          <MaterialIcon name={'MdRemoveRedEye'} />
          <h3>{products.countOpened}</h3>
        </div>
        <div className={styles.description}>Чаще всего просматривают</div></>

      )}
    </div>
  </div>
}

export default PopularProducts

