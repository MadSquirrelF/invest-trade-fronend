import NewEdit from '@/components/screens/admin/new/NewEdit'
import { NextPageAuth } from '@/shared/types/auth.types'


const NewEditPage: NextPageAuth = () => {
  return <NewEdit />
}

NewEditPage.isOnlyAdmin = true

export default NewEditPage