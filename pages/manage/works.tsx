import WorksList from '@/components/screens/admin/works/WorkList'
import { NextPageAuth } from '@/shared/types/auth.types'

const WorksListPage: NextPageAuth = () => {
  return <WorksList />
}

WorksListPage.isOnlyAdmin = true

export default WorksListPage