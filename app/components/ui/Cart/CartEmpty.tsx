import Image from 'next/image'
import React, { FC } from 'react'
import errorNotFound from '@/assets/images/commons/NotFound.png'
import Heading from '../heading/Heading'
import Button from '../form-elements/Button'
import { useRouter } from 'next/router'
import styles from '../NotFoundBlock/NotFoundBlock.module.scss'
const CartEmpty: FC = () => {
  const { push } = useRouter()
  return (

    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <Heading title='Корзина пустая'></Heading>
          <p> Вероятней всего, вы не заказывали ещё ничего.  Для того, чтобы заказать товар, перейди на главную страницу в раздел товар.</p>
          <Button onClick={() => push('/')}> Вернуться на главную страницу</Button>

        </div>

        <div className={styles.image}>
          <Image src={errorNotFound} alt={'errorImage'} height={400} width={400} />
        </div>



      </div>
    </section>

  )
}

export default CartEmpty