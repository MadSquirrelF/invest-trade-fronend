import WorkEdit from '@/components/screens/admin/work/WorkEdit';
import { NextPageAuth } from '@/shared/types/auth.types';

const WorkEditPage: NextPageAuth = () => <WorkEdit />;

WorkEditPage.isOnlyAdmin = true;

export default WorkEditPage;
