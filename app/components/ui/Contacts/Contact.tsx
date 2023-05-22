import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
import styles from './Contact.module.scss';

import { IClouds } from '../Portfolio/cloud.interface';

import MaterialIcon from '../MaterialIcon';

interface IContact {
  clouds: IClouds;
}
const Contact: FC<IContact> = ({ clouds: { clouds } }) => (

  <section
    className={styles.root}
    id="footer"
  >
    <div className={styles.clouds}>
      {clouds.map((cloud) => (
        <Image
          key={cloud.title}
          src={cloud.image}
          // @ts-ignore
          style={{ '--i': String(cloud.ind) }}
          alt={cloud.title}
          draggable={false}
          priority
          className={styles.cloud}
        />
      ))}
    </div>
    <div className={styles.wrapper}>
      <div className={styles.loadContent}>

        <iframe
          title="This is a unique title"
          src="https://yandex.ru/map-widget/v1/-/CCUjm4VnkD"
          width="100%"
          height="100%"
          allowFullScreen
        />

        <div className={styles.contact}>
          <h1>КОНТАКТЫ</h1>
          <div className={styles.item}>
            <MaterialIcon name="MdPhone" />
            <a href="tel:+73512170704">
              +7 (351) 217-07-04
            </a>
          </div>
          <div className={styles.item}>
            <MaterialIcon name="MdMail" />
            <a href="mailto:mail@invest-trade.biz">
              mail@invest-trade.biz
            </a>
          </div>
          <h2>454017, г. Челябинск, ул. Ушакова, 1а</h2>
          <p>
            Подписывайтесь на соц. сети и рассылку, чтобы
            следить за актуальными новостями ↓
          </p>
        </div>

      </div>
      <div className={styles.footer}>
        <h2>© 2023. Все права защищены</h2>
        <Link href="/privacy">
          Политика конфиденциальности
        </Link>
        <div className={styles.links}>
          <h2>
            Создан при поддержке -
            <a href="https://vk.com/bel044ka">Шабанов А.А.</a>
          </h2>
          <h2>
            Freepik -
            <a href="https://ru.freepik.com/author/stories">Изображения от storyset</a>
          </h2>
        </div>

      </div>
    </div>
  </section>
);

export default Contact;
