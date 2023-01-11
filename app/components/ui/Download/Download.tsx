import { FC, useState } from 'react'
import styles from './Download.module.scss'
import Image from 'next/image'
import schtern from '../../../assets/images/icons/Schtern.svg'
import maco from '../../../assets/images/icons/MACO.svg'
import endow from '../../../assets/images/icons/Endow.png'
import catalog from '../../../assets/images/catalog.png'
import Button from '../form-elements/Button'
import MaterialIcon from '../MaterialIcon'
import cn from 'classnames'

import useDownloader from "react-use-downloader";

interface ICatalog {
  filename: string
  fileUrl: string
  name: string
  image: string
  weight: string
}

const data: ICatalog[] = [{
  filename: 'Technical_Catalog_Schtern.pdf',
  fileUrl: '/files/Technical_Catalog_Schtern.pdf',
  name: 'Schtern',
  image: schtern,
  weight: '9,9 мб'
},
{
  filename: 'Technical_Catalog_Endow.pdf',
  fileUrl: '/files/Technical_Catalog_Endow.pdf',
  name: 'Endow',
  image: endow,
  weight: '15,8 мб'
},
{
  filename: 'Technical_Catalog_MACO.pdf',
  fileUrl: '/files/Technical_Catalog_MACO.pdf',
  name: 'MACO',
  image: maco,
  weight: '2,1 мб'
},
]


const Download: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { download } = useDownloader()
  return (
    <section className={styles.root} id={'catalog'}>

      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Скачайте наши каталоги<br />
            <span>прямо сейчас в один клик</span>
          </h1>
        </div>
        <div className={styles.wrapper} >
          <div className={styles.catalog}>
            <Image src={catalog} unoptimized priority draggable={false} alt={'catalog'} height={700} width={1000} />
            <button onClick={() => download(data[activeIndex].fileUrl, data[activeIndex].filename)}>
              <div>
                <h1>PDF <br /> <span>{data[activeIndex].weight}</span></h1>
                <MaterialIcon name='MdDownload' />
              </div>
            </button>
          </div>
          <div className={styles.container}>
            <h2>Выберите каталог, который хотите скачать <br /> и нажмите на кнопку</h2>
            <div className={styles.flexbox}>
              <div className={cn(styles.box, { [styles.active]: activeIndex === 0 })} onClick={() => setActiveIndex(0)}>
                <Image src={data[0].image} alt={data[0].name} height={50} width={100} draggable={false} unoptimized priority />
                <h3>{data[0].weight}</h3>
              </div>
              <div className={cn(styles.box, { [styles.active]: activeIndex === 1 })} onClick={() => setActiveIndex(1)}>
                <Image src={data[1].image} alt={data[0].name} height={50} width={100} draggable={false} unoptimized priority />
                <h3>{data[1].weight}</h3>
              </div>
              <div className={cn(styles.box, { [styles.active]: activeIndex === 2 })} onClick={() => setActiveIndex(2)}>
                <Image src={data[2].image} alt={data[0].name} height={50} width={50} draggable={false} unoptimized priority />
                <h3>{data[2].weight}</h3>
              </div>
            </div>
          </div>

        </div>



      </div>
      <div className={styles.bgtext}>
        CATALOG
      </div>
    </section>
  )
}

export default Download