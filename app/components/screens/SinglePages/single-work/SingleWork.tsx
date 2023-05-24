import React, { FC } from 'react';
import Image from 'next/image';
import { stripHtml } from 'string-strip-html';
import Link from 'next/link';
import { IWork } from '@/shared/types/product.types';
import Meta from '@/utils/meta/Meta';

import NoImage from '@/assets/images/commons/noImage.jpg';
import styles from '../single-new/SingleNew.module.scss';
import MaterialIcon from '@/components/ui/MaterialIcon';

const SingleNew: FC<{ item: IWork }> = ({ item }) => (
  <Meta
    title={item.title}
    description={`Пример нашей работы ${item.title}`}
  >
    <section className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{item.title}</h1>
        </div>
        <hr />
        <div className={styles.container}>
          <div className={styles.images}>
            <div className={styles.card}>
              <div className={styles.banner}>
                {item.image_1 !== `` ? (
                  <Image
                    src={item.image_1}
                    alt={item.image_1}
                    draggable={false}
                    fill
                    priority
                  />
                ) : (
                  <Image
                    src={NoImage}
                    alt="noImage"
                    draggable={false}
                    fill
                    priority
                  />
                )}
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.banner}>

                {item.image_2 !== `` ? (
                  <Image
                    src={item.image_2}
                    alt={item.image_2}
                    draggable={false}
                    fill
                    priority
                  />
                ) : (
                  <Image
                    src={NoImage}
                    alt="noImage"
                    draggable={false}
                    fill
                    priority
                  />
                )}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.banner}>

                {item.image_3 !== `` ? (
                  <Image
                    src={item.image_3}
                    alt={item.image_3}
                    draggable={false}
                    fill
                    priority
                  />
                ) : (
                  <Image
                    src={NoImage}
                    alt="noImage"
                    draggable={false}
                    fill
                    priority
                  />
                )}
              </div>
            </div>

            <div className={styles.card}>
              <div
                className={styles.banner}
                style={{ display: item.image_4 === `` ? `none` : `block` }}
              >

                {item.image_4 !== `` ? (
                  <Image
                    src={item.image_4}
                    alt={item.image_4}
                    draggable={false}
                    fill
                    priority
                  />
                ) : null}
              </div>
            </div>

            <div className={styles.card}>
              <div
                className={styles.banner}
                style={{ display: item.image_5 === `` ? `none` : `block` }}
              >
                {item.image_5 !== `` ? (
                  <Image
                    src={item.image_5}
                    alt={item.image_5}
                    draggable={false}
                    fill
                    priority
                  />
                ) : null}
              </div>
            </div>

            <div className={styles.card}>
              <div
                className={styles.banner}
                style={{ display: item.image_6 === `` ? `none` : `block` }}
              >
                {item.image_6 !== `` ? (
                  <Image
                    src={item.image_6}
                    alt={item.image_6}
                    draggable={false}
                    fill
                    priority
                  />
                ) : null}
              </div>
            </div>

          </div>

          <div className={styles.text}>
            <p>{stripHtml(item.description_full).result}</p>
            <Link href="/#news">
              <MaterialIcon name="MdWest" />
              <span>Вернуться к списку</span>
            </Link>
          </div>

        </div>

      </div>

    </section>
  </Meta>
);

export default SingleNew;
