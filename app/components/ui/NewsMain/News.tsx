import Link from 'next/link';
import { FC } from 'react';
import { convertMongoDbData } from '@/utils/date/ConvertMongoDbData';
import MaterialIcon from '../MaterialIcon';
import { INewItem } from './new.interface';
import styles from './News.module.scss';

const News: FC<{ news: INewItem[] }> = ({ news }) => (
  <div className={styles.wrapper}>
    <div className={styles.IconContainer}>
      <MaterialIcon name="MdEmail" />
      <div className={styles.CountMessage}>
        <span>{news.length}</span>
      </div>
    </div>
    <div className={styles.content}>
      {news.length === 0 ? (
        <div className={styles.title}>
          <h2>Новостей пока нет</h2>
        </div>
      ) : (
        <>
          <div className={styles.title}>
            <h2>Последние новости</h2>
          </div>
          <span>{convertMongoDbData(news[0].createdAt)}</span>
          <h3>{news[0].title}</h3>
          <Link href="/#news">
            Все новости
          </Link>
        </>
      )}

    </div>
  </div>
);

export default News;
