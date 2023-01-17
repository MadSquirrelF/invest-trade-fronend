import React, { FC } from 'react'
import { IGalleryShip } from './Ship.interface'
import styles from './Ship.module.scss'
import Image from 'next/image'

const Ship: FC<{ items: IGalleryShip }> = ({ items }) => {
  return (
    <div className={styles.root} id={'delivery'} >
      <div className={styles.title}>
        <h1>доставляем окна
          <span> собственным транспортом</span>
        </h1>
      </div>
      <div className={styles.container}>
        {items.items.map((item) => (
          <div key={item.id} className={styles.box}>
            <Image src={item.image} priority fill draggable={false} alt={item.text} />
            <span>{item.id}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ship