import Image from "next/image"
import { FC } from "react"
import styles from './SocialBox.module.scss'
import instagram from '@/assets/images/icons/insta.svg'
import vk from '@/assets/images/icons/vk.svg'
import telegram from '@/assets/images/icons/logos_telegram.svg'
import MaterialIcon from "@/components/ui/MaterialIcon"
const SocialBox: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Есть вопросы?</h1>
        <div className={styles.onlineContainer}>
          <p>Задавайте онлайн </p>
          <MaterialIcon name='MdOutlineOnlinePrediction' />
        </div>

      </div>
      <div className={styles.links}>
        <a href="https://instagram.com/invest_trade_74?igshid=YWJhMjlhZTc=" target="_blank">
          <Image src={instagram} alt={"instagram"} draggable={false} fill />
        </a>
        <a href="https://vk.com/public202627186" target="_blank">
          <Image src={vk} alt={"vk"} draggable={false} fill />
        </a>
        <a href="https://web.telegram.org/z/#-1726439362" target="_blank">
          <Image src={telegram} alt={"telegram"} draggable={false} fill />
        </a>
      </div>
    </div>
  )
}

export default SocialBox