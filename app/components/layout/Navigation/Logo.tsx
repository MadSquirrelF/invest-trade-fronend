import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import logoImage from '@/assets/images/icons/logo.svg'
import styles from './Navigation.module.scss'
const Logo: FC = () => {
  return (
    <Link href="/" className={styles.logo} style={{ marginRight: '20px' }}>
      <Image
        src={logoImage}
        fill
        alt="InvestTrade app"
        draggable={false}
        priority
      />
    </Link>
  )
}

export default Logo
