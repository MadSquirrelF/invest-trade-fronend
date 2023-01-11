import { IGalleryItem } from "@/components/ui/gallery/gallery.types";
import { IProduct } from "@/shared/types/product.types";
import Meta from "@/utils/meta/Meta";
import { FC, useState } from "react";
import { useUpdateCountOpened } from "./useUpdateCountOpened";
import styles from './SingleProduct.module.scss'
import Image from "next/image";
import Heading from "@/components/ui/heading/Heading";
import { stripHtml } from "string-strip-html";
import FavoriteButton from "@/components/ui/Shop/FavoriteButton/FavoriteButton";
import MaterialIcon from "@/components/ui/MaterialIcon";
import dynamic from "next/dynamic";
import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Gallery from "@/components/ui/gallery/Gallery";

const DynamicRateProduct = dynamic(() => import('./RateProduct/RateProduct'), {
  ssr: false,
})

const SingleProduct: FC<{ product: IProduct; similarProducts: IGalleryItem[] }> = ({
  product,
  similarProducts
}) => {
  useUpdateCountOpened(product.slug)

  const [activeMenu, setActiveMenu] = useState(true)

  const [activeInfo, setActiveInfo] = useState(false)
  return (
    <Meta title={product.title} description={`Товар ${product.title}`}>
      <section className={styles.root}>
        <div className={styles.wrapper}>
          <h5 >{product.title}</h5>
          <div className={cn(styles.banner, { [styles.active]: activeMenu === false })}>
            <div className={styles.logo}>
              <Image src={product.logo_image} alt={"product single logo"} height={70} width={150} draggable={false} unoptimized />
            </div>
            <div className={styles.nav}>
              <div onClick={() => setActiveMenu(true)} className={cn(styles.box, { [styles.active]: activeMenu === true })}>
                <h2>О товаре</h2>
              </div>
              <div onClick={() => setActiveMenu(false)} className={cn(styles.box, { [styles.active]: activeMenu === false })}>
                <h2>Характеристики</h2>
              </div>
            </div>
            {activeInfo && product.category[0].name === 'ПВХ профиль' && (<div className={styles.
              specifications}>
              <h1>Характеристика</h1>
              <div className={styles.stats}>
                <h2><span>  {product.parameters.basic_profile_width} мм - </span> Базовая ширина профиля </h2>
                <h2><span>  {product.parameters.count_cell} - </span>Количество воздушных камер </h2>
                <h2><span>  {product.parameters.number_of_sealing_contours} - </span>Количество контуров уплотнения </h2>
                <h2><span>  {product.parameters.double_glazed_window} мм - </span>Двухкамерный стеклопакет </h2>
                <h2><span>  {product.parameters.color} - </span>Цвет контура уплотнения </h2>
                <h2> <span>  {product.parameters.accessories} - </span>Фурнитура</h2>
              </div>
            </div>)}
            <div className={styles.content}>


              <div className={styles.container}>
                <CSSTransition in={activeMenu} onEnter={() => setActiveInfo(false)} onExited={() => setActiveInfo(true)} classNames='slide-animation' timeout={300} unmountOnExit>
                  <>
                    <div className={styles.title}>
                      <h1>{product.title}</h1>
                    </div>
                    <div className={styles.row}>
                      <h4>{product.rating.toFixed(1)}</h4>
                      <div className={styles.view}>
                        <MaterialIcon name='MdVisibility' />
                        <h3>{product.countOpened}</h3>
                      </div>
                    </div>
                    <div className={styles.description_short}>
                      <p>{stripHtml(product.description_short).result}</p>
                    </div>
                    <DynamicRateProduct slug={product.slug} _id={product._id} />
                    <div className={styles.buttons}>
                      <div className={styles.addCart}>
                        <span>Заказать</span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                            stroke="blue"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                            stroke="blue"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                            stroke="blue"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <FavoriteButton productId={product._id} />
                    </div>
                  </>
                </CSSTransition>
                {activeInfo && (<div className={styles.info}>
                  <div className={styles.title}>
                    <h1>{product.title}</h1>
                  </div>
                  <div className={styles.row}>
                    <h4>{product.rating.toFixed(1)}</h4>
                    <div className={styles.view}>
                      <MaterialIcon name='MdVisibility' />
                      <h3>{product.countOpened}</h3>
                    </div>
                  </div>
                  <div className={styles.description_full}>
                    <h2>Описание товара:</h2>
                    <p>{stripHtml(product.description_full).result}</p>
                  </div>


                </div>)}
              </div>

            </div>
            <div className={cn(styles.image, { [styles.big]: product.category[0].name !== 'ПВХ профиль' })}>
              <Image src={product.image} alt={"product single image"} fill draggable={false} unoptimized />
            </div>
          </div>
          <div className={styles.rating}>

          </div>
        </div>
      </section>
    </Meta>
  )
}

export default SingleProduct