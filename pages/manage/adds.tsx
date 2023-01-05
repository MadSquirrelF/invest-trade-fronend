import AddList from '@/components/screens/admin/adds/AddList'
import { NextPageAuth } from '@/shared/types/auth.types'


const AddListPage: NextPageAuth = () => {
  return <AddList />
}

AddListPage.isOnlyAdmin = true

export default AddListPage