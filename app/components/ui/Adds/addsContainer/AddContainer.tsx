import { FC } from 'react'
import styles from '@/components/ui/Adds/Add.module.scss'
import AddItem from './AddItem'
import { IAdds } from '@/shared/types/product.types'


const AddContainer: FC<{ items: IAdds[] }> = ({ items }) => {
  return (
    <div className={styles.gallery}>
      {items.map((item) => (<AddItem item={item} key={item._id} />))}
    </div>
  )
}

export default AddContainer