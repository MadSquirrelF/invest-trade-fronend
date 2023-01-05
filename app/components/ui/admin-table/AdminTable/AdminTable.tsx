import { FC } from 'react'
import SkeletonLoader from '../../heading/SkeletonLoader'
import { ITableItem } from './admin-table.interface'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import styles from './AdminTable.module.scss'

interface IAdminTable {
  tableItems: ITableItem[]
  isLoading: boolean
  headerItems: string[]
  removeHandler: (id: string) => void
}
const AdminTable: FC<IAdminTable> = ({ removeHandler, headerItems, isLoading, tableItems }) => {
  return <div>
    <AdminTableHeader headerItems={headerItems} />
    {isLoading ? <SkeletonLoader count={1} height={48} className='mt-4' /> : tableItems.length ? tableItems.map(tableItem => <AdminTableItem tableItem={tableItem} removeHandler={() => removeHandler(tableItem._id)} key={tableItem._id} />) : <div className={styles.notFound}>Данных пока нет</div>}
  </div>
}

export default AdminTable