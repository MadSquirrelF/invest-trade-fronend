import { FC } from 'react'

import styles from '../Admin.module.scss'
import CountUsers from './CountUsers'
import PopularProducts from './PopularProducts'


const Statistic: FC = () => {
  return <div className={styles.statistics}>
    <CountUsers />
    <PopularProducts />
  </div>
}

export default Statistic