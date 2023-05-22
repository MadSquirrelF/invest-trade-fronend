import { FC } from 'react';

import Brands from './Brands';

import { useBrands } from './useBrands';

const BrandMenu: FC = () => {
  const { isLoading, data } = useBrands();

  return isLoading ? (
    <Brands
      items={[]}
    />
  ) : (
    <Brands
      items={data || []}
    />
  );
};

export default BrandMenu;
