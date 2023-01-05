import { NextPageAuth } from '@/shared/types/auth.types'
import dynamic from 'next/dynamic'

const DynamicProfile = dynamic(() => import('@/components/screens/Porfile/Profile'), { ssr: false })

const ProfilePage: NextPageAuth = () => {
  return <DynamicProfile />
}

ProfilePage.isOnlyUser = true

export default ProfilePage
