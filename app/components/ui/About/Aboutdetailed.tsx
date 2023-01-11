import Image from 'next/image'
import styles from './About.module.scss'
import aboutimg from '@/assets/images/aboutdetail2.png'
import CountUp from 'react-countup'

const Aboutdetailed = () => {
  return (
    <section className={styles.root}>

      <div className={styles.container}>

        <div className={styles.content}>
          <div className={styles.title}>
            <h1>О компании <br />
              <span> инвест-трейд</span>
            </h1>
            <h5>Уже более 10 лет мы помогаем создать уют в домах наших клиентов. С каждым годом мы улучшаем свой сервис на основе ваших отзывов, и делаем все, чтобы вам было приятно с нами работать. <br /> <br /> В нашем уютном коллеткиве только истинные специалисты, которые подберут идеально решение и расшифруют все технические нюансы на понятном вам языке</h5>

          </div>
          <div className={styles.gridboxes}>
            <div className={styles.box}>
              <h1>
                <CountUp start={100} end={2008} duration={2} delay={0} className='text-primary' />
              </h1>
              <div className={styles.text}>
                <span>год</span>
              </div>
              <p>дата открытия компании в Челябинске!</p>
            </div>
            <div className={styles.box}>
              <h1>
                <CountUp start={0} end={50} duration={2} delay={0} className='text-primary' />
                +</h1>
              <div className={styles.text}>
                <span>лет</span>
              </div>
              <p>гарантированный срок службы профиля!</p>
            </div>
            <div className={styles.box}>
              <h1><CountUp start={0} end={100} duration={2} delay={0} className='text-primary' /></h1>
              <div className={styles.text}>
                <span>процентов</span>
              </div>
              <p>качество товаров и услуг!</p>
            </div>
            <div className={styles.box}>
              <h1><CountUp start={100} end={1000} duration={2} delay={0} className='text-primary' />+</h1>
              <div className={styles.text}>
                <span>клиентов</span>
              </div>
              <p>довольных нашей работой!</p>
            </div>
          </div>
        </div>
        <Image src={aboutimg} alt={'aboutimg'} draggable={false} height={500} width={540} />

      </div>


    </section>
  )
}

export default Aboutdetailed