import Image from 'next/image'
import React, { FC } from 'react'
import cartEmpty from '@/assets/images/commons/emptybusket.jpg'
import Heading from '../../heading/Heading'
import Button from '../../form-elements/Button'
import { useRouter } from 'next/router'
import styles from '@/components/ui/NotFoundBlock/NotFoundBlock.module.scss'
const CartEmpty: FC = () => {
  const { push } = useRouter()
  return (

    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <Heading title='Корзина пустая'></Heading>
          <p> Советуем вам ознакомится с нашим ассортиментом в разделе товар.</p>
          <Image src={cartEmpty} alt="cartEmpty" draggable={false} height={300} width={500} />

          <Button onClick={() => push('/')}> Вернуться на главную страницу</Button>

        </div>



      </div>
    </section>

  )
}

export default CartEmpty