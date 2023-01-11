import { FC, useEffect, useState } from 'react'
import styles from './News.module.scss'
import { INewItem } from './new.interface';
import Image from 'next/image';
import { convertMongoDbData } from '@/utils/date/ConvertMongoDbData';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MaterialIcon from '../MaterialIcon';
import cn from 'classnames'
import { stripHtml } from 'string-strip-html';
import Link from 'next/link';



const NewsSection: FC<{ news: INewItem[] }> = ({ news }) => {

  const [windowDimenion, detectHW] = useState(
    2000
  )

  const detectSize = () => {
    detectHW(
      window.innerWidth
    )
  }
  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])


  return (
    <section className={styles.root} id={'news'} >
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>cтатьи и
            <span> новости</span>
          </h1>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={windowDimenion >= 1500 ? 3 : windowDimenion < 1500 && windowDimenion > 1000 ? 2 : 1}
          pagination={{ clickable: true }}
          className={styles.swiper}
        >
          {news.map(item => <SwiperSlide key={item._id} className={styles.slide}>
            <Link href={item.link}>
              <div className={styles.image}>
                <Image fill src={item.image_1} alt={item._id} />
              </div>
              <div className={styles.content}>
                <div className={styles.user}>
                  <div className={styles.box}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 4H6C3.79086 4 2 5.79086 2 8V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V8C22 5.79086 20.2091 4 18 4Z" stroke="#0000FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 2V6M16 2V6M2 10H22" stroke="#0000FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>{convertMongoDbData(item.createdAt)}</p>
                  </div>
                  <div className={styles.box}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 21C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5C21 21 19.5 21 19.5 21H4.5ZM12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12Z" fill="#0000FF" />
                    </svg>
                    <p>{item.username}</p>
                  </div>
                  <div className={cn(styles.box, styles.eye)}>
                    <MaterialIcon name='MdRemoveRedEye' />
                    <p>{item.countOpened}</p>
                  </div>
                </div>
                <div className={styles.info}>
                  <h1 > {item.title}
                  </h1>
                  <p>{stripHtml(item.description_short).result}</p>
                </div>

              </div>
            </Link>

          </SwiperSlide>)}
        </Swiper>

      </div>


    </section>
  )
}

export default NewsSection