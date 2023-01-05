import { ILoginInput } from '@/components/ui/Auth/auth.interface'
import Field from '@/components/ui/form-elements/Field'
import { validEmail } from '@/shared/regex'
import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'


interface ILoginFields {
  register: UseFormRegister<any>
  formState: FormState<ILoginInput>
  isPasswordRequired?: boolean
}

const LoginFields: FC<ILoginFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <>
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
        {...register(
          'password',
          isPasswordRequired
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
    </>
  )
}

export default LoginFields