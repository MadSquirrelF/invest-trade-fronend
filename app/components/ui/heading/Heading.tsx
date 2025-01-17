import { FC } from 'react';

interface IHeading {
  title: string;
  className?: string;
}

const Heading: FC<IHeading> = ({ title, className }) => (
  <h1 className={`text-black  font-semibold ${className?.includes(`xl`) ? `` : `text-3xl`} ${className}`}>{title}</h1>
);

export default Heading;
