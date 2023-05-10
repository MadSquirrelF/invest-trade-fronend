import { FC } from 'react';
import SmallButton from '../../form-elements/SmallButton';
import MaterialIcon from '../../MaterialIcon';

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => <SmallButton onClick={onClick}><MaterialIcon name="MdAdd" /></SmallButton>;

export default AdminCreateButton;
