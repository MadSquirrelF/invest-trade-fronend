import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import logoImage from '@/assets/images/logo.svg'

const Logo: FC = () => {
  return (
    <Link href="/">
      <Image
        src={logoImage}
        width={250}
        height={50}
        alt="InvestTrade app"
        draggable={false}
        priority
        unoptimized
      />
    </Link>
  )
}

export default Logo
