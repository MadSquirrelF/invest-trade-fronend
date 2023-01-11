
import Button from '@/components/ui/form-elements/Button'

import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import { useAuth } from '@/hooks/useAuth'
import { UserService } from '@/services/user.service'
import Meta from '@/utils/meta/Meta'
import { toastError } from '@/utils/toastError'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import styles from './Profile.module.scss'
import Image from 'next/image'
import avatar from '@/assets/images/icons/avatar-svgrepo-com.svg'
import { IProfileInput } from './profile.interface'
import Field from '@/components/ui/form-elements/Field'
import { validEmail } from '@/shared/regex'
import ReactSelect from 'react-select'
import { IOption } from '@/components/ui/select/select.interface'
import makeAnimated from 'react-select/animated'
import styled from '../../ui/select/select.module.scss'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import { useRouter } from 'next/router'




const getValue = (value: string) =>
  value ? options.find((option) => option.value === value) : ''


const options: IOption[] = [{
  value: 'Мужчина',
  label: 'Мужчина',
}, {
  value: 'Женщина',
  label: 'Женщина',
},]

const animatedComponents = makeAnimated()

const Profile: FC = () => {

  const router = useRouter()



  const { handleSubmit, register, formState: { errors }, setValue, control } = useForm<IProfileInput>({
    mode: 'onChange'
  })

  const { isLoading, refetch } = useQuery('profile', () => UserService.getProfile(), {
    onSuccess({ data }) {
      setValue('email', data.email)
      setValue('username', data.username)
    },
    onError(error) {
      toastError(error, 'Get profile')
    }
  })

  const { mutateAsync } = useMutation('update profile', (data: IProfileInput) => UserService.updateProfile(data), {
    onError(error) {
      toastError(error, 'Ошибка обновления профиля')
    },
    onSuccess() {
      toastr.success('Редактирование профиля', 'Обновлен успешно')
      router.reload()
    },
  })

  const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
    await mutateAsync(data)
  }

  const { user } = useAuth()

  return (
    <Meta title="Профиль">
      <section className={styles.root}>
        <div className={styles.container} >


          <div className={styles.info}>
            <div className={styles.title}>
              <div className={styles.image}>
                {user?.avatar ? (<Image src={user.avatar} alt={'user avatar'} fill unoptimized draggable={false} />)
                  : (<Image src={avatar} alt={'default avatar'} fill unoptimized draggable={false} />)}
              </div>
              <div className={styles.name}>
                <Heading title="Профиль" />
                <h2>{user?.username}</h2>
              </div>

            </div>
            <hr />
            <div className={styles.box}>
              <Heading title="Пол" />
              <h2>{user?.sex}</h2>
            </div>
            <div className={styles.box}>
              <Heading title="Почта" />
              <h2>{user?.email}</h2>
            </div>
            <div className={styles.box}>
              <Heading title="Номер телефона" />
              <h2>{user?.phone_number === '' ? user?.phone_number : 'Не указан'}</h2>
            </div>

          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {isLoading ? (<SkeletonLoader count={5} className='h-10 w-1/2' />) : (<>
              <div className={styles.fields}>
                <Field
                  {...register('email', {
                    required: 'Введите почту',
                    pattern: {
                      value: validEmail,
                      message: 'Неправильная введена почта!',
                    },
                  })}
                  placeholder="Почта"
                  type="email"
                  error={errors.email}
                />
                <Field
                  {...register('username', {
                    required: 'Введите имя',
                    minLength: {
                      value: 3,
                      message: 'Имя должно быть больше 3 сим.!',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Имя должно быть меньше 10 сим.!'
                    }
                  })}
                  placeholder="Имя"
                  type="text"
                  error={errors.username}
                />
                <Field
                  {...register(
                    'password',
                    false
                      ? {
                        required: 'Введите пароль',
                        minLength: {
                          value: 6,
                          message: 'Пароль должен быть мин. 6 символов!',
                        },
                      }
                      : {}
                  )}
                  placeholder="Пароль"
                  type="password"
                  error={errors.password}
                />

                <Controller
                  control={control}
                  name='sex'
                  rules={{
                    required: 'Укажите пол!'
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (<div className={styled.selectContainer}>
                    <label >
                      <label>Пол</label>
                      <ReactSelect
                        classNamePrefix="custom-select"
                        placeholder='Пол'
                        value={getValue(value)}
                        onChange={newValue => onChange((newValue as IOption).value)}
                        components={animatedComponents}
                        options={options} />
                    </label>
                    {error && <div className={styled.error}>{error.message}</div>}
                  </div>
                  )}
                />
                <Controller
                  name="avatar"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UploadField
                      placeholder="Аватар"
                      error={error}
                      folder="users"
                      image={value}
                      onChange={onChange} isNoImage={false} />
                  )}
                />

                <Button onClick={() => refetch()}>Обновить</Button>
              </div>
            </>
            )}
          </form>


        </div>


      </section>

    </Meta>
  )
}


export default Profile

