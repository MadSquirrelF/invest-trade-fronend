import AddEdit from '@/components/screens/admin/add/AddEdit'
import { NextPageAuth } from '@/shared/types/auth.types'


const AddEditPage: NextPageAuth = () => {
  return <AddEdit />
}

AddEditPage.isOnlyAdmin = true

export default AddEditPage