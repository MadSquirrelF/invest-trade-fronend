import Image from 'next/image'
import React, { FC } from 'react'
import emptyWishlist from '@/assets/images/commons/emptyWishlist.jpg'
import { useRouter } from 'next/router'
import styles from '@/components/ui/NotFoundBlock/NotFoundBlock.module.scss'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/form-elements/Button'

const FavoritesEmpty: FC = () => {
  const { push } = useRouter()
  return (

    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <Heading title='Раздел избранное пока пуст'></Heading>
          <p>Попробуйте кликнуть на сердце у вашего часто покупаемого товара</p>
          <Image src={emptyWishlist} alt="emptyWishlist" draggable={false} height={300} width={500} />

          <Button onClick={() => push('/')}> Вернуться на главную страницу</Button>

        </div>



      </div>
    </section>

  )
}

export default FavoritesEmpty