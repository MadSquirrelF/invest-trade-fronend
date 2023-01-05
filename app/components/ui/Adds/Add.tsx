import { FC } from 'react'
import styles from './Add.module.scss'
import { IAddItem } from './addsContainer/add.interface'
import AddContainer from './addsContainer/AddContainer'

const Add: FC<{ adds: IAddItem[] }> = ({ adds }) => {
  return (
    <section className={styles.Add}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Укомплектовываем всем НЕОБХОДИМЫМ<br />
            <span>для производства окон</span>
          </h1>
        </div>
        {adds.length && <AddContainer items={adds} />}
      </div>


    </section>
  )
}

export default Add