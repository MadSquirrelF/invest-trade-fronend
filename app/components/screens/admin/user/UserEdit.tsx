
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'

import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import Meta from '@/utils/meta/Meta'

import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IUserEditInput } from './user-edit.interface'
import { useUserEdit } from './useUserEdit'

import styles from '../AdminTables.module.scss'

import Button from '@/components/ui/form-elements/Button'
import RegistrationFields from '@/components/layout/Navigation/MenuContainer/auth/RegistrationFields'
import Field from '@/components/ui/form-elements/Field'
import { validEmail } from '@/shared/regex'
import ReactSelect from 'react-select'
import { IOption } from '@/components/ui/select/select.interface'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'



const UserEdit: FC = () => {

  const { handleSubmit, register, formState: { errors }, setValue, getValues, control } = useForm<IUserEditInput>({
    mode: 'onChange'
  })

  const getValue = (value: string) =>
    value ? options.find((option) => option.value === value) : ''


  const options: IOption[] = [{
    value: 'Мужчина',
    label: 'Мужчина',
  }, {
    value: 'Женщина',
    label: 'Женщина',
  },]


  const { isLoading, onSubmit } = useUserEdit(setValue)

  return <Meta title='Редактирование пользователя'>
    <section className={styles.wrapper}>
      <div className={styles.container} style={{ marginTop: '300px' }} >
        <AdminNavigation />
        <Heading title='Редактирование пользователя' />
        <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
          {isLoading ? <SkeletonLoader count={3} /> : <>

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
              })}
              placeholder="Имя"
              type="text"
              error={errors.username}
            />
            <Field
              {...register(
                'password',
                {
                  required: 'Введите пароль',
                  minLength: {
                    value: 6,
                    message: 'Пароль должен быть мин. 6 символов!',
                  },
                }
              )}
              placeholder="Пароль"
              type="password"
              error={errors.password}
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


            <Controller control={control}
              name='isAdmin'
              render={({ field }) =>
                <button onClick={(e) => {
                  e.preventDefault()
                  field.onChange(!field.value)
                }} className='btn-primary px-4 p-2 block mb-7'>
                  {field.value ? 'Сделать обычным пользователем' : 'Сделать администратором'}
                </button>} />

            <Button>Обновить</Button>

          </>}
        </form>
      </div>
    </section>
  </Meta>
}

export default UserEdit

