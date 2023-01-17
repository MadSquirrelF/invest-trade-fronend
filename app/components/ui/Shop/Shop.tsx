import { FC, useEffect } from 'react'
import styles from './Shop.module.scss'
import Search from './Search'
import { Sort } from './Sort/Sort'
import { useSelector } from 'react-redux'
import { selectFilter } from '@/store/filter/selectors'
import Pagination from '../Pagination'
import { setCurrentPage } from '@/store/filter/slice'
import { selectProductData } from '@/store/product/selectors'
import { fetchProducts } from '@/store/product/asyncActions'
import { useAppDispatch } from '@/store/store'
import ProductLoader from './Skeleton'
import errorImage from '@/assets/images/error.png'
import Image from 'next/image'
import { stripHtml } from 'string-strip-html'
import cn from 'classnames'
import MaterialIcon from '../MaterialIcon'


import FavoriteButton from './FavoriteButton/FavoriteButton'
import Link from 'next/link'
import { getProductUrl } from 'config/url.config'
import { useRouter } from 'next/router'
import { setScroll, setScrollPositon } from '@/store/scroll/slice'


const Shop: FC = () => {

  const dispatch = useAppDispatch();

  const { sort, currentPage, searchValue, categoryIds } = useSelector(selectFilter)
  const { items, status } = useSelector(selectProductData)
  const { scrollPosition } = useSelector(setScroll)
  const getProducts = async () => {
    const searchTerm = searchValue;
    const orderBy = sort.sortOrder;
    const sortBy = sort.sortProperty;
    const page = String(currentPage)
    dispatch(fetchProducts({ searchTerm, orderBy, sortBy, page, categoryIds }))
  };

  useEffect(() => {
    getProducts()
    window.scrollTo(0, scrollPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sort, searchValue, categoryIds]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const ranglist = ['A', 'B', 'C', 'D', 'E']


  const skeletons = [...new Array(6)].map((_, index) => <ProductLoader key={index} />);

  return (
    <section className={styles.root} id={'shop'}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.title}>
            <h1>Каталог
              <span> товаров</span>
            </h1>
          </div>
        </div>
        <div className={styles.settings}>
          <Search />
          <Sort value={sort} />
        </div>


        {status === 'error' ? (<div className={styles.center}>
          <div className={styles.error}>
            <h1>Произошла ошибка 😕</h1>
            <p>
              К сожалению, не удалось сохранить товар.
              <br />
              Попробуйте повторить попытку!
            </p>
            <Image src={errorImage} alt={'errorImage'} draggable={false} height={400} width={400} />
          </div></div>
        ) : status === 'loading' ? (<div className={styles.container}>
          {skeletons}</div>)
          : items.length > 0 && items[0].category[0].name === 'ПВХ профиль' ? (<div className={styles.container}>
            {items.map((item, index) =>
            (<div key={item.slug} className={styles.item}>
              <div className={styles.brand}>
                <Image src={item.logo_image} alt={item.slug} draggable={false} width={90} height={50} />
              </div>
              <div className={styles.horizontal}>
                <div className={styles.box}>
                  <div className={cn(styles.circle, styles.blue)}>
                    <h5>{ranglist[item.parameters.rang]}</h5>
                  </div>
                  <h3>Класс </h3>
                </div>
                <div className={styles.box}>
                  <div className={cn(styles.circle, styles.blueGradient)}>
                    <div className={styles.blockText}>
                      <h6>{item.parameters.basic_profile_width}</h6>
                      <span>мм</span>
                    </div>

                  </div>
                  <h3>Ширина</h3>
                </div>
                <div className={styles.box}>
                  <div className={cn(styles.circle, styles.blackGradient)}>
                    <h5>{item.parameters.count_cell}</h5>
                  </div>
                  <h3>Камеры</h3>
                </div>

              </div>

              <div className={styles.rating}>
                <MaterialIcon name="MdStarRate" />
                <span>{item.rating.toFixed(1)}</span>
              </div>
              <div className={styles.cart}>
                <div className={styles.productFunctions}>
                  <FavoriteButton productId={item._id} />
                  <Link href={getProductUrl(item.slug)} className={styles.button}><MaterialIcon name='MdVisibility' /></Link>
                </div>
                <div className={styles.cartAdd}>
                  <div className={styles.btn}>
                    <span>Добавить</span>
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
                </div>
              </div>
              <div className={styles.topFlex}>
                <div className={styles.image}>
                  <Image src={item.image} alt={item.title} fill draggable={false} />
                </div>
              </div>
              <div className={styles.content}>
                <h2>{item.title}</h2>
                <p>{stripHtml(item.description_short).result}</p>
                <div className={styles.box}>
                  <h3>Теплоизоляция</h3>
                  <div className={styles.levelContainer}>
                    <div className={cn(styles.level, {
                      [styles.one]: item.levelSetting.warmInsulation === 1,
                      [styles.two]: item.levelSetting.warmInsulation === 2,
                      [styles.three]: item.levelSetting.warmInsulation === 3,
                      [styles.four]: item.levelSetting.warmInsulation >= 4
                    })}></div>
                  </div>
                </div>
                <div className={styles.box}>
                  <h3>Звукоизоляция</h3>
                  <div className={styles.levelContainer}>
                    <div className={cn(styles.level, {
                      [styles.one]: item.levelSetting.soundInsulation === 1,
                      [styles.two]: item.levelSetting.soundInsulation === 2,
                      [styles.three]: item.levelSetting.soundInsulation === 3,
                      [styles.four]: item.levelSetting.soundInsulation >= 4
                    })}></div>
                  </div>
                </div>
                <div className={styles.box}>
                  <h3>Светопропускаемость</h3>
                  <div className={styles.levelContainer}>
                    <div className={cn(styles.level, {
                      [styles.one]: item.levelSetting.lightInsulation === 1,
                      [styles.two]: item.levelSetting.lightInsulation === 2,
                      [styles.three]: item.levelSetting.lightInsulation === 3,
                      [styles.four]: item.levelSetting.lightInsulation >= 4
                    })}></div>
                  </div>
                </div>
              </div>
            </div>))}</div>)
            : items.length > 0 && items[0].category[0].name !== 'ПВХ профиль' ? (
              <div className={styles.container}>
                {items.map((item, index) => (
                  <div key={item.slug} className={cn(styles.item, styles.short)}>
                    <div className={cn(styles.brand, styles.big)}>
                      <Image src={item.logo_image} alt={item.slug} draggable={false} width={50} height={50} priority />
                    </div>

                    <div className={styles.rating}>
                      <MaterialIcon name="MdStarRate" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                    <div className={styles.cart}>
                      <div className={styles.productFunctions}>
                        <FavoriteButton productId={item._id} />
                        <Link href={getProductUrl(item.slug)} className={styles.button}><MaterialIcon name='MdVisibility' /></Link>
                      </div>
                      <div className={styles.cartAdd}>
                        <div className={styles.btn}>
                          <span>Добавить</span>
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
                      </div>
                    </div>
                    <div className={styles.imageContainer}>
                      <div className={styles.image}>
                        <Image src={item.image} alt={item.title} draggable={false} fill />
                      </div>
                    </div>
                    <div className={styles.content}>
                      <h2>{item.title}</h2>
                      <p>{stripHtml(item.description_short).result}</p>
                    </div>
                  </div>
                ))}
              </div>






            ) : (<div className={styles.center}><div className={styles.error}>
              <h1>Не удалось найти товар 😕?</h1>
              <p>
                Страница может находится на стадии наполнения или такой товар отсутствует.<br />
                Попробуйте поискать что-то другое!
              </p>
              <Image src={errorImage} alt={'errorImage'} height={400} width={400} />
            </div> </div>)}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </section >
  )
}

export default Shop