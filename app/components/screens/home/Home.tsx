import About from '@/components/ui/About/About'
import { IconList } from '@/components/ui/About/About.data'
import Add from '@/components/ui/Adds/Add'
import Contact from '@/components/ui/Contacts/Contact'
import Download from '@/components/ui/Download/Download'
import Ask from '@/components/ui/FAQ/Ask'



import MaterialIcon from '@/components/ui/MaterialIcon'
import News from '@/components/ui/NewsMain/News'
import NewsSection from '@/components/ui/NewsMain/NewsSection'
import { CloudList } from '@/components/ui/Portfolio/clouds.data'
import Portfolio from '@/components/ui/Portfolio/Portfolio'
import Ship from '@/components/ui/Ship/Ship'
import { GalleryShipList } from '@/components/ui/Ship/Ship.data'
import CategoryMenu from '@/components/ui/Shop/Categories/CategoryMenu'
import Shop from '@/components/ui/Shop/Shop'

import Meta from '@/utils/meta/Meta'
import Link from 'next/link'
import React, { FC } from 'react'
import { IHome } from './Home.interface'
import styles from './Home.module.scss'

const Home: FC<IHome> = ({ slides, Adds, news }) => {

  return (
    <Meta title="Главная страница" description="Ваш партнер в оконном бизнесе!">
      <div className={styles.MouseScroll}>
        <h1>SCROLL</h1>
        <hr />
        <div className={styles.svgM}>
          <MaterialIcon name='MdMouse' />
        </div>

      </div>


      <section className={styles.home} id='home' >
        <div className={styles.content}>
          <h1>Ваш партнер<br /> <span>В оконном бизнесе</span></h1>
          <div className={styles.subTitle}>
            <svg width="38" height="11" viewBox="0 0 38 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle opacity="0.2" cx="5" cy="5.35107" r="4.5" stroke="white" />
              <circle opacity="0.5" cx="19" cy="5.35107" r="4.5" stroke="white" />
              <circle opacity="0.7" cx="33" cy="5.35107" r="4.5" stroke="white" />
            </svg>
            <h2>Поставщик оборудования и материалов для
              производства пластиковых и алюминиевых конструкций  </h2>
          </div>
          <div className={styles.Mainbtn}>
            <Link href='/#shop' className={styles.button}>Наш ассортимент</Link>
          </div>
          <News news={news} />
        </div>
      </section>

      <CategoryMenu />

      <About icons={IconList} />
      <Portfolio slides={slides} clouds={CloudList} />
      <Add adds={Adds} />
      <Shop />
      <Download />
      <Ship items={GalleryShipList} />
      <NewsSection news={news} />
      <Ask />
      <Contact clouds={CloudList} />
    </Meta>
  )
}

export default Home