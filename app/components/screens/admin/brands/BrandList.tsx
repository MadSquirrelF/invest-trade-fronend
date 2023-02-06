import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { useBrand } from './useBrand'
import styles from '../AdminTables.module.scss'

const BrandList: FC = () => {

  const { handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync } = useBrand()
  return <Meta title='Бренды'>
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title='Все бренды' />
        <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync} />
        <AdminTable isLoading={isLoading} removeHandler={deleteAsync} headerItems={['Название']} tableItems={data || []} />
      </div>
    </section>
  </Meta>
}

export default BrandList