import { FC } from 'react';
import Image from 'next/image';
import { stripHtml } from 'string-strip-html';
import { ISlide } from './slider.interface';
import styles from './Slider.module.scss';

interface ISlideItem {
  slide: ISlide;
}
const SlideItem: FC<ISlideItem> = ({ slide }) => (
  <div className={styles.slide}>

    {slide.poster && (
      <Image
        fill
        className={styles.image}
        src={slide.poster}
        alt={slide.title}
        draggable={false}
        priority
      />
    )}
    <h1>ИНВЕСТ-ТРЕЙД</h1>
    <div className={styles.content}>

      <div className={styles.heading}>{slide.title}</div>
      <div className={styles.subHeading}>{stripHtml(slide.description).result}</div>
      {/* <button className={styles.button} onClick={() => push(slide.link)}>{buttonTitle}</button> */}
    </div>
  </div>
);

export default SlideItem;
