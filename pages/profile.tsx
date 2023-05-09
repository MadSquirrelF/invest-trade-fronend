import dynamic from 'next/dynamic';
import { NextPageAuth } from '@/shared/types/auth.types';

const DynamicProfile = dynamic(() => import(`@/components/screens/Porfile/Profile`), { ssr: false });

const ProfilePage: NextPageAuth = () => <DynamicProfile />;

ProfilePage.isOnlyUser = true;

export default ProfilePage;
