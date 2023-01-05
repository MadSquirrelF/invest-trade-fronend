import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import Statistic from './Statistics/Statistic'
import styles from './Admin.module.scss'
const Admin: FC = () => {
  return <Meta title='Панель администрации'>
    <section className={styles.admin}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title='Общая статистика' />
        <Statistic />
      </div>

    </section>
  </Meta>
}

export default Admin