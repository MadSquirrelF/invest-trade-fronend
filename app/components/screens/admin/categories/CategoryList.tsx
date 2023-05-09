import { FC } from 'react';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/components/ui/heading/Heading';
import { useCategory } from './useCategory';
import styles from '../AdminTables.module.scss';

const CategoryList: FC = () => {
  const {
    handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync,
  } = useCategory();
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title="Все категории" />
        <AdminHeader
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          onClick={createAsync}
        />
        <AdminTable
          isLoading={isLoading}
          removeHandler={deleteAsync}
          headerItems={[`Название`, `id`]}
          tableItems={data || []}
        />
      </div>
    </section>
  );
};

export default CategoryList;
