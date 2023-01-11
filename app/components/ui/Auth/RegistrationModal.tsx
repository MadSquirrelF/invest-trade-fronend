import RegistrationFields from '@/components/layout/Navigation/MenuContainer/auth/RegistrationFields'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import Link from 'next/link'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Button from '../form-elements/Button'
import Heading from '../heading/Heading'
import { IRegistrationInput } from './auth.interface'
import styles from './auth.module.scss'




const RegistrationModal: FC = () => {

  useAuthRedirect()

  const { isLoading } = useAuth()

  const { register: registerInput, handleSubmit, formState, reset, control } = useForm<IRegistrationInput>({
    mode: 'onChange'
  })

  const { register } = useActions()


  const onSubmit: SubmitHandler<IRegistrationInput> = (data) => {
    register(data)

    reset()
  }



  return <div className={styles.containerReg} >
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Heading title='Регистрация' className='mb-1 text-4xl text-primary' />
      <h3>Для того, чтобы перейти к личным данным нужно войти или зарегестрироваться</h3>

      <RegistrationFields formState={formState} control={control} register={registerInput} isPasswordRequired />

      <div className={styles.button}>
        <Button type='submit' disabled={isLoading}>Регистрация</Button>
      </div>

      <p >Продолжая, вы соглашаетесь <Link href='/'>со сбором и обработкой персональных данных и пользовательским соглашением</Link></p>
    </form>
  </div>
}

export default RegistrationModal