import Image from 'next/image'
import { FC, useState } from 'react'
import styles from './Contact.module.scss'

import { IClouds } from '../Portfolio/cloud.interface'

import Link from 'next/link'

import footerBg from '@/assets/images/footerBg.jpg'

import MaterialIcon from '../MaterialIcon'





interface IContact {
  clouds: IClouds
}
const Contact: FC<IContact> = ({ clouds: { clouds } }) => {



  return (

    <section className={styles.root} id={'footer'}>
      <Image src={footerBg} alt={'footerBg'} fill priority draggable={'false'} />
      <div className={styles.clouds}>
        {clouds.map((cloud, i) => (<Image key={cloud.title}
          src={cloud.image}
          //@ts-ignore
          style={{ '--i': String(cloud.ind) }}
          alt={cloud.title}
          draggable={false}
          priority
          className={styles.cloud}
        />))}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.loadContent}>
          <div className={styles.Map}>
            <iframe src="https://yandex.ru/map-widget/v1/-/CCUjm4VnkD" width="100%" height="100%" allowFullScreen={true} ></iframe>
          </div>
          <div className={styles.contact}>
            <h1>КОНТАКТЫ</h1>
            <div className={styles.item}>
              <MaterialIcon name='MdPhone' />
              <a href='tel:+73512170704'>
                +7 (351) 217-07-04
              </a>
            </div>
            <div className={styles.item}>
              <MaterialIcon name='MdMail' />
              <a href='mailto:mail@invest-trade.biz'>
                mail@invest-trade.biz
              </a>
            </div>
            <h2>454017, г. Челябинск, ул. Ушакова, 1а</h2>
            <p>Подписывайтесь на соц. сети и рассылку, чтобы
              следить за актуальными новостями ↓</p>
          </div>

        </div>
        <div className={styles.footer}>
          <h2>© 2022. Все права защищены</h2>
          <Link href='/'>
            Политика конфиденциальности
          </Link>
          <h2>Создан при поддержке - <a href='https://vk.com/bel044ka'>Шабанов А.А.</a> </h2>

        </div>
      </div>
    </section>
  )
}

export default Contact