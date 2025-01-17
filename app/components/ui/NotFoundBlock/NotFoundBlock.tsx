import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './NotFoundBlock.module.scss';
import error404 from '@/assets/images/commons/404.png';
import Heading from '../heading/Heading';
import Button from '../form-elements/Button';

export const NotFoundBlock: React.FC = () => {
  const { push } = useRouter();
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <Heading title="Ошибка 404 - Страница не найдена или находится в разработке..." />
          <Image
            src={error404}
            alt="MissPageSticker"
            draggable={false}
            height={300}
            width={500}
          />
          <Button onClick={() => push(`/`)}> Вернуться на главную страницу</Button>
        </div>
      </div>
    </section>
  );
};
export default NotFoundBlock;
