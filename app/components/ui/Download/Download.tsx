import { FC, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import useDownloader from "react-use-downloader";
import styles from './Download.module.scss';
import schtern from '../../../assets/images/icons/Schtern.svg';
import maco from '../../../assets/images/icons/MACO.svg';
import endow from '../../../assets/images/icons/Endow.png';
import catalog from '../../../assets/images/commons/catalog.png';
import ringer from '@/assets/images/icons/ringer.png';
import MaterialIcon from '../MaterialIcon';

import Button from '../form-elements/Button';

interface ICatalog {
  filename: string;
  fileUrl: string;
  name: string;
  image: string;
  weight: string;
}

const data: ICatalog[] = [{
  filename: `Technical_Catalog_Schtern.pdf`,
  fileUrl: `/files/Technical_Catalog_Schtern.pdf`,
  name: `Schtern`,
  image: schtern,
  weight: `9,9 мб`,
},
{
  filename: `Technical_Catalog_Endow.pdf`,
  fileUrl: `/files/Technical_Catalog_Endow.pdf`,
  name: `Endow`,
  image: endow,
  weight: `15,8 мб`,
},
{
  filename: `Technical_Catalog_MACO.pdf`,
  fileUrl: `/files/Technical_Catalog_MACO.pdf`,
  name: `MACO`,
  image: maco,
  weight: `2,1 мб`,
},
{
  filename: `Technical_Catalog_Ringer.pdf`,
  fileUrl: `/files/Technical_Catalog_Ringer.pdf`,
  name: `Ringer`,
  image: ringer,
  weight: `1 мб`,
},
];

const Download: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    size, elapsed, percentage, download, cancel, error,
  } = useDownloader();
  return (
    <section
      className={styles.root}
      id="catalog"
    >

      <div className={styles.content}>
        <div className={styles.title}>
          <h1>
            Скачайте наши каталоги
            <br />
            <span>прямо сейчас в один клик</span>
          </h1>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.catalog}>
            <Image
              src={catalog}
              priority
              draggable={false}
              alt="catalog"
              height={700}
              width={1000}
            />
            <button
              type="button"
              className={styles.download}
              onClick={() => download(data[activeIndex].fileUrl, data[activeIndex].filename)}
            >

              <MaterialIcon name="MdDownload" />

            </button>

          </div>
          <div className={styles.container}>
            <div className={styles.blockinfo}>

              <h2>
                Выберите каталог, который хотите скачать
                {` `}
                <br />
                {` `}
                и нажмите на кнопку
              </h2>
              <div className={styles.downloadInfo}>
                <label htmlFor="file">Прогресс загрузки:</label>
                <progress
                  id="file"
                  value={percentage}
                  max="100"
                  className={styles.progressBar}
                />
                <p>
                  Размер загрузки
                  {` `}
                  {size}
                  {` `}
                  байт
                </p>
                <p>
                  Осталось ждать:
                  {` `}
                  {elapsed}
                  {` `}
                  сек
                </p>
                <Button
                  style={{
                    backgroundColor: `red`,
                    marginTop: 10,
                  }}
                  onClick={() => cancel()}
                >
                  Отменить
                </Button>
                {error && (
                  <p>
                    possible error
                    {` `}
                    {JSON.stringify(error)}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.flexbox}>
              <ul>
                <li
                  className={cn(styles.box, { [styles.active]: activeIndex === 0 })}

                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(0)}
                  >
                    <Image
                      src={data[0].image}
                      alt={data[0].name}
                      priority
                      draggable={false}
                      width={90}
                      height={40}
                    />
                  </button>

                </li>
                <li
                  className={cn(styles.box, { [styles.active]: activeIndex === 1 })}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(1)}
                  >
                    <Image
                      src={data[1].image}
                      alt={data[1].name}
                      priority
                      draggable={false}
                      width={90}
                      height={40}
                    />
                  </button>
                </li>
                <li
                  className={cn(styles.box, { [styles.active]: activeIndex === 2 })}

                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(2)}
                  >
                    <Image
                      src={data[2].image}
                      alt={data[2].name}
                      priority
                      draggable={false}
                      width={90}
                      height={40}
                    />
                  </button>
                </li>
                <li
                  className={cn(styles.box, { [styles.active]: activeIndex === 3 })}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(3)}
                  >
                    <Image
                      src={data[3].image}
                      alt={data[3].name}
                      priority
                      draggable={false}
                      width={90}
                      height={40}
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      <div className={styles.bgtext}>
        CATALOG
      </div>
    </section>
  );
};

export default Download;
