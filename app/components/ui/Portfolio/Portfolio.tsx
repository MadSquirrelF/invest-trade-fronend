import { FC } from 'react'
import styles from './Portfolio.module.scss'
import { ISlide, ISlider } from '../slider/slider.interface'
import Slider from '../slider/Slider'
import Image from 'next/image'
import { IClouds } from './cloud.interface'

interface IPorfolio {
  slides: ISlide[]
  clouds: IClouds
}
const Portfolio: FC<IPorfolio> = ({ slides, clouds: { clouds } }) => {
  return (
    <section className={styles.Portfolio} id={'portfolio'}>
      <div className={styles.content}>

        <div className={styles.title}>
          <h1>НАШЕ ПОРТФОЛИО <br />
            <span>ГОТОВЫХ РАБОТ</span>
          </h1>
        </div>
        <div className={styles.subtitle}>
          <h2>Все в лучших традициях ИНВЕСТ-ТРЕЙД.
            <br /><br /><span>Мы внесли свой вклад в остекление таких проектов как...</span>
          </h2>
        </div>

      </div>
      {slides.length && <Slider slides={slides} />}
      <div className={styles.clouds}>
        {clouds.map((cloud, i) => (<Image key={cloud.title}
          src={cloud.image}
          //@ts-ignore
          style={{ '--i': String(cloud.ind) }}
          alt={cloud.title}
          draggable={false}
          quality={100}
          className={styles.cloud}
         />))}
      </div>
    </section>

  )
}

export default Portfolio