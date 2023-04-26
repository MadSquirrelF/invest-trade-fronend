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
import error404 from '@/assets/images/commons/404.png'
import errorNotFound from '@/assets/images/commons/NotFound.png'
import Image from 'next/image'
import { setScroll } from '@/store/scroll/slice'
import BrandMenu from './Brands/BrandMenu'
import ShopItem from './ShopItem'
import dynamic from 'next/dynamic'

const DynamicProductLoader = dynamic(() => import(`./Skeleton`), { ssr: false });

const Shop: FC = () => {

  const dispatch = useAppDispatch();

  const { sort, currentPage, searchValue, categoryIds, brandIds } = useSelector(selectFilter)
  const { items, status } = useSelector(selectProductData)
  const { scrollPosition } = useSelector(setScroll)


  const getProducts = async () => {
    const searchTerm = searchValue;
    const orderBy = sort.sortOrder;
    const sortBy = sort.sortProperty;
    const page = String(currentPage)
    dispatch(fetchProducts({ searchTerm, orderBy, sortBy, page, categoryIds, brandIds }))
  };

  useEffect(() => {
    getProducts()
    window.scrollTo(0, scrollPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sort, searchValue, categoryIds, brandIds]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const skeletons = [...new Array(6)].map((_, index) => <DynamicProductLoader key={index} />);

  return (
    <section className={styles.root} id={'shop'}>

      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.title}>
            <h1>Каталог
              <span> товаров</span>
            </h1>
          </div>

          <Search />
        </div>

        <div className={styles.settings}>

          <BrandMenu />
          <Sort value={sort} />
        </div>



        {status === 'error' ? (<div className={styles.center}>
          <div className={styles.error}>
            <h1>Ошибка соединение</h1>
            <p>
              К сожалению, не удалось загрузить товар товар.
              <br />
              Проверьте подключение к интернету!
            </p>
            <Image src={error404} alt={'errorImage'} height={400} width={400} />
          </div></div>
        ) : status === 'loading' ? (<div className={styles.container}>
          {skeletons}</div>)
          : items.data.length > 0 ? (<div className={styles.container}>
            {items.data.map((item) =>
            (<ShopItem item={item} key={item._id}/>))}</div>)
            : (<div className={styles.center}><div className={styles.error}>
              <h1>Не удалось найти товар</h1>
              <p>
                Попробуйте поискать что-то другое.
              </p>
              <Image src={errorNotFound} alt={'errorImage'} height={400} width={400} />
            </div> </div>)}
        {items.last_page > 1 ? (<Pagination totalPages={items.last_page} currentPage={currentPage} onChangePage={onChangePage} />) : null}
      </div>
    </section >
  )
}

export default Shop