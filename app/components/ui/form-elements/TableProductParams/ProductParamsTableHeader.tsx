import { FC } from 'react'
import styles from './ProductTable.module.scss'
import cn from 'classnames'

const ProductParamsTableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
  return <div className={cn(styles.item, styles.itemHeader)}>
    {headerItems.map(value => (<div key={value}>
      {value}
    </div>))}
  </div>
}

export default ProductParamsTableHeader