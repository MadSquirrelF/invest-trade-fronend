import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useWork } from './useWork'
import styles from '../AdminTables.module.scss'
const WorkList: FC = () => {

  const { handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync } = useWork()
  return <Meta title='Портфолио'>
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title='Все портфолио' />
        <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync} />
        <AdminTable isLoading={isLoading} removeHandler={deleteAsync} headerItems={['Название', 'Дата публикации']} tableItems={data || []} />
      </div>
    </section>
  </Meta >
}

export default WorkList