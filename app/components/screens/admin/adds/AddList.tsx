import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useAdd } from './useAdd'
import styles from '../AdminTables.module.scss'
const AddList: FC = () => {

  const { handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync } = useAdd()
  return <Meta title='Добавки'>
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title='Все добавки' />
        <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync} />
        <AdminTable isLoading={isLoading} removeHandler={deleteAsync} headerItems={['Название', 'Цена']} tableItems={data || []} />
      </div>
    </section>
  </Meta>
}

export default AddList