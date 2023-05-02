import dynamic from 'next/dynamic';
import { FC } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { IMenu } from './menu.interface';
import styles from './Menu.module.scss';
import { selectModal, setNav } from '@/store/modal/modal.slice';
import MaterialIcon from '@/components/ui/MaterialIcon';

const DynamicMenuItem = dynamic(() => import(`./MenuItem`), { ssr: false });

const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
  const { nav } = useSelector(selectModal);
  const dispatch = useDispatch();
  return (
    <div className={cn(styles.menu, { [styles.active]: nav === true })}>

      <ul className={styles.ul}>
        {items.map((item) => (
          <DynamicMenuItem
            item={item}
            key={item.link}
          />
        ))}
      </ul>
      <button
        type="button"
        onClick={() => dispatch(setNav(false))}
      >
        <MaterialIcon name="MdClose" />
      </button>

    </div>
  );
};

export default Menu;
