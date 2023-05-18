import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import cn from 'classnames';

import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => (
  <Skeleton
    {...rest}
    baseColor="#f3f3f3"
    highlightColor="#ecebeb"
    className={cn(`rounded-lg`, className)}
  />
);

export default SkeletonLoader;
