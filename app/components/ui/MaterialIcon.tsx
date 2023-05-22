import * as MaterialIcons from 'react-icons/md';
import { FC } from 'react';
import { TypeMaterialIconName } from '@/shared/types/icons.types';
import { useRenderClient } from '@/hooks/useRenderClient';

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
  const { isRenderClient } = useRenderClient();
  const IconComponent = MaterialIcons[name];

  if (isRenderClient) return <IconComponent /> || <MaterialIcons.MdDragIndicator />;
  return null;
};

export default MaterialIcon;
