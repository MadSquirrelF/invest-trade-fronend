import NewList from '@/components/screens/admin/news/NewList'
import { NextPageAuth } from '@/shared/types/auth.types'

const NewsListPage: NextPageAuth = () => {
  return <NewList />
}

NewsListPage.isOnlyAdmin = true

export default NewsListPage