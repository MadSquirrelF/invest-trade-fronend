import { useRouter } from 'next/router'
import { FC } from 'react'
import { ISlide } from './slider.interface'
import Image from 'next/image'
import styles from './Slider.module.scss'
import { stripHtml } from 'string-strip-html'
interface ISlideItem {
  slide: ISlide
  buttonTitle?: string
}
const SlideItem: FC<ISlideItem> = ({ slide, buttonTitle = 'Смотреть' }) => {

  const { push } = useRouter()
  return (
    <div className={styles.slide}>

      {slide.poster && <Image fill className={styles.image} src={slide.poster} alt={slide.title} draggable={false} priority />}
      <h1>ИНВЕСТ-ТРЕЙД</h1>
      <div className={styles.content}>


        <div className={styles.heading}>{slide.title}</div>
        <div className={styles.subHeading}>{stripHtml(slide.description).result}</div>
        {/* <button className={styles.button} onClick={() => push(slide.link)}>{buttonTitle}</button> */}
      </div>
    </div>
  )
}

export default SlideItem