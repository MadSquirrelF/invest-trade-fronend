import { FC } from 'react'
import { IAddItem } from './add.interface'
import styles from '../Add.module.scss'
import AddItem from './AddItem'


const AddContainer: FC<{ items: IAddItem[] }> = ({ items }) => {
  return (
    <div className={styles.gallery}>
      {items.map(item => (<AddItem item={item} key={item.link} />))}
    </div>
  )
}

export default AddContainer