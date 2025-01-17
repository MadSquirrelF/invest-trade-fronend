import { FC } from 'react';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/components/ui/heading/Heading';
import { useNew } from './useNew';
import styles from '../AdminTables.module.scss';

const NewList: FC = () => {
  const {
    handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync,
  } = useNew();
  return (

    <section className={styles.wrapper}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title="Все новости" />
        <AdminHeader
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          onClick={createAsync}
        />
        <AdminTable
          isLoading={isLoading}
          removeHandler={deleteAsync}
          headerItems={[`Название`, `Дата публикации`, `Автор`, `Просмотры`]}
          tableItems={data || []}
        />
      </div>
    </section>
  );
};

export default NewList;
