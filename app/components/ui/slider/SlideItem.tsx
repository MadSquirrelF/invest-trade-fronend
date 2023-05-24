import { FC } from 'react';
import Image from 'next/image';
import { stripHtml } from 'string-strip-html';
import { useRouter } from 'next/router';
import { ISlide } from './slider.interface';
import styles from './Slider.module.scss';
import Button from '../form-elements/Button';

interface ISlideItem {
  slide: ISlide;
}
const SlideItem: FC<ISlideItem> = ({ slide }) => {
  const { push } = useRouter();

  return (
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
        <div className={styles.subHeading}>{stripHtml(slide.description_short).result}</div>
        <Button
          type="button"
          onClick={() => push(slide.link)}
        >
          Посмотреть
        </Button>
      </div>
    </div>
  );
};

export default SlideItem;
