import Image from 'next/image'
import React, { FC } from 'react'
import cartEmpty from '@/assets/images/commons/emptybusket.jpg'
import { useRouter } from 'next/router'
import styles from '@/components/ui/NotFoundBlock/NotFoundBlock.module.scss'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/form-elements/Button'
const CartEmpty: FC = () => {
  const { push } = useRouter()
  return (

    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <Heading title='Ваша корзина на данный момент пустая'></Heading>
          <p> Советуем вам ознакомится с нашим ассортиментом в разделе товар.</p>
          <Image src={cartEmpty} alt="cartEmpty" draggable={false} height={300} width={500} />
          <Button onClick={() => push('/')}> Вернуться на главную страницу</Button>
        </div>
      </div>
    </section>

  )
}

export default CartEmpty