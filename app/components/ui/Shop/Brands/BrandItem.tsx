import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import cn from 'classnames';
import { IBrandItem } from "./useBrands";
import { setBrandId, setCategoryId, setCurrentPage } from "@/store/filter/slice";
import styles from './Brands.module.scss';
import { selectFilter } from "@/store/filter/selectors";

const BrandItem: FC<{ item: IBrandItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const { brandIds } = useSelector(selectFilter);

  const dispatchBrand = () => {
    dispatch(setBrandId(item._id));
    dispatch(setCategoryId(``));
    dispatch(setCurrentPage(1));
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      key={item._id}
      className={cn(styles.item, { [styles.active]: item._id === brandIds })}
      onClick={() => dispatchBrand()}
    >
      <Image
        src={item.image}
        alt="brand_id"
        priority
        draggable={false}
        width={90}
        height={40}
      />

    </li>
  );
};

export default BrandItem;
