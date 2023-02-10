
import { FC } from "react"
import styles from './ContactBox.module.scss'
import MaterialIcon from "@/components/ui/MaterialIcon"
const ContactBox: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Ежедневно</h1>
        <div className={styles.onlineContainer}>
          <p>C 10:00 - 19:00</p>
          <MaterialIcon name='MdOutlineOnlinePrediction' />
        </div>
      </div>
      <div className={styles.links}>
        <a href='tel:+73512170704'>
          +7 (351) 217-07-04
        </a>
        <a href='mailto:mail@invest-trade.biz'>
          mail@invest-trade.biz
        </a>
      </div>

    </div>
  )
}

export default ContactBox