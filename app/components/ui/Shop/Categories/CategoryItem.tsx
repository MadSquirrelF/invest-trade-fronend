import { IMenuItem } from '@/components/layout/Navigation/MenuContainer/menu.interface'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './CategoryItems.module.scss'
import { ICategoryItem } from './useCategories'
import Image from 'next/image'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage } from '@/store/filter/slice'
import { selectFilter } from '@/store/filter/selectors'


const MenuItem: FC<{ item: ICategoryItem }> = ({ item }) => {

  const dispatch = useDispatch()

  const { categoryIds } = useSelector(selectFilter)
  const { push } = useRouter()
  const dispatchCategory = () => {
    dispatch(setCategoryId(item._id))
    push('/#shop')
    dispatch(setCurrentPage(1))
  }

  return (
    <li className={cn(styles.li, { [styles.active]: item._id === categoryIds })}
      onClick={() => dispatchCategory()}>
      <div className={styles.image}>
        <Image src={item.image} alt={'CategoryImage'} height={40} width={40} draggable={false} priority />
      </div>
      <h3>{item.name}</h3>
      <hr />
    </li>
  )
}

export default MenuItem
