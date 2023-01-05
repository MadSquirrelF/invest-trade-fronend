import { FC } from 'react'
import { IAddItemProps } from './add.interface'
import styles from '../Add.module.scss'
import Image from 'next/image'


const AddItem: FC<IAddItemProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <h4>{item.title}</h4>
      <div className={styles.image}>
        <Image src={item.imagePath} alt={item.title} fill draggable={false} priority />
      </div>

    </div>
  )
}

export default AddItem