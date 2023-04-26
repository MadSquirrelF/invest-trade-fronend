
import { FC } from 'react'

import BrandItem from './BrandItem'
import styles from './Brands.module.scss'
import { IBrandItem } from './useBrands'

const Brands: FC<{ items: IBrandItem[] }> = ({ items }) => {

  return (
    <div className={styles.brands}>
      <ul>
        {items.map((item) => (
          <BrandItem item={item} key={item._id} />
        ))}
      </ul>
    </div>

  )
}

export default Brands