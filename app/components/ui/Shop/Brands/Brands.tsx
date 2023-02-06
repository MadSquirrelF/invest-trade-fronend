import { selectFilter } from '@/store/filter/selectors'
import { setBrandId } from '@/store/filter/slice'
import cn from 'classnames'
import Image from 'next/image'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Brands.module.scss'
import { IBrandItem } from './useBrands'

const Brands: FC<{ items: IBrandItem[] }> = ({ items }) => {

  const dispatch = useDispatch()
  const { brandIds } = useSelector(selectFilter)

  return (
    <div className={styles.brands}>
      <ul>
        {items.map((item, i) => (
          <li key={i} onClick={() => dispatch(setBrandId(item._id))} className={cn(styles.item, { [styles.active]: item._id === brandIds })} >
            <Image src={item.image} alt={'brand_id'} priority draggable={false} width={90} height={40} />
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Brands