import { FC } from 'react';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import Heading from '@/components/ui/heading/Heading';
import { useUsers } from './useUser';
import styles from '../AdminTables.module.scss';

const UserList: FC = () => {
  const {
    handleSearch, isLoading, searchTerm, data, deleteAsync,
  } = useUsers();
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        <AdminNavigation />
        <Heading title="Все пользователи" />
        <AdminHeader
          handleSearch={handleSearch}
          searchTerm={searchTerm}
        />
        <AdminTable
          isLoading={isLoading}
          removeHandler={deleteAsync}
          headerItems={[`Почта`, `Дата регистрации`]}
          tableItems={data || []}
        />
      </div>
    </section>
  );
};

export default UserList;
