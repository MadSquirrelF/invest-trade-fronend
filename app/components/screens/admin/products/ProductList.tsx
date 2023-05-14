import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/components/ui/heading/Heading';
import { useProduct } from './useProduct';
import styles from '../AdminTables.module.scss';
import Pagination from '@/components/ui/Pagination';
import { setCurrentPage } from '@/store/filter/slice';
import { selectFilter } from '@/store/filter/selectors';

const ProductList: FC = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(selectFilter);
  const {
    handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync,
  } = useProduct();

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <section className={styles.wrapper}>
      <div
        className={styles.container}
        style={{ marginTop: `300px` }}
      >
        <AdminNavigation />
        <Heading title="Все товары" />
        <AdminHeader
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          onClick={createAsync}
        />
        <AdminTable
          isLoading={isLoading}
          removeHandler={deleteAsync}
          headerItems={[`Название`, `Категории`, `Рейтинг`, `В наличии?`]}
          tableItems={data || []}
        />
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalPages={10}
        />
      </div>
    </section>
  );
};

export default ProductList;
