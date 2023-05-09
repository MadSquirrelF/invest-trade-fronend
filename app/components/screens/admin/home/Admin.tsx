import { FC } from 'react';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import Statistic from './Statistics/Statistic';
import styles from './Admin.module.scss';

const Admin: FC = () => (
  <section className={styles.admin}>
    <div className={styles.container}>
      <AdminNavigation />
      <Heading title="Общая статистика" />
      <Statistic />
    </div>

  </section>
);

export default Admin;
