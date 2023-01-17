import { INew } from '@/shared/types/product.types'
import Meta from '@/utils/meta/Meta'
import React, { FC } from 'react'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import styles from './SingleNew.module.scss'
import Image from 'next/image'
import { convertMongoDbData } from '@/utils/date/ConvertMongoDbData'
import cn from 'classnames'
import MaterialIcon from '@/components/ui/MaterialIcon'
import { stripHtml } from 'string-strip-html'
import Link from 'next/link'
const SingleNew: FC<{ item: INew }> = ({ item }) => {

  useUpdateCountOpened(item.slug)
  return (
    <Meta title={item.title} description={`Новость о ${item.title}`}>
      <section className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h1>{item.title}</h1>
          </div>
          <hr />
          <div className={styles.info}>
            <div className={styles.box}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 21C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5C21 21 19.5 21 19.5 21H4.5ZM12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12Z" fill="#0000FF" />
              </svg>
              <h2>{item.username}</h2>
            </div>
            <div className={styles.box}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 4H6C3.79086 4 2 5.79086 2 8V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V8C22 5.79086 20.2091 4 18 4Z" stroke="#0000FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 2V6M16 2V6M2 10H22" stroke="#0000FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{convertMongoDbData(item.createdAt)}</span>

            </div>

            <div className={cn(styles.box, styles.eye)}>
              <MaterialIcon name='MdRemoveRedEye' />
              <p>{item.countOpened}</p>
            </div>


          </div>
          <div className={styles.container}>


            <div className={styles.text}>
              <p>{stripHtml(item.description_full).result}</p>
              <Link href={'/#news'}>
                <MaterialIcon name={'MdWest'} />
                <span>Вернуться к списку</span></Link>
            </div>
            <div className={styles.images}>
              <div className={styles.banner}>
                <Image src={item.image_1} alt={item.image_1} draggable={false} fill priority />
              </div>
              <div className={styles.banner}>
                {item.image_2 ? <Image src={item.image_2} alt={item.image_2} draggable={false} fill priority /> : null}
              </div>
              <div className={styles.banner}>
                {item.image_3 ? <Image src={item.image_3} alt={item.image_3} draggable={false} fill priority /> : null}
              </div>


            </div>
          </div>


        </div>

      </section>
    </Meta>
  )
}

export default SingleNew