import { FC } from 'react';
import {
  Control, Controller, FormState, UseFormRegister,
} from 'react-hook-form';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import InputMask from "react-input-mask";
import { IRegistrationInput } from '@/components/ui/Auth/auth.interface';
import Field from '@/components/ui/form-elements/Field';
import UploadField from '@/components/ui/form-elements/UploadField/UploadField';
import { IOption } from '@/components/ui/select/select.interface';
import { validEmail } from '@/shared/regex';
import styles from '../../../../ui/select/select.module.scss';

interface IRegistrationFields {
  register: UseFormRegister<any>;
  formState: FormState<IRegistrationInput>;
  isPasswordRequired?: boolean;
  control: Control<IRegistrationInput>;
}

const options: IOption[] = [{
  value: `Мужчина`,
  label: `Мужчина`,
}, {
  value: `Женщина`,
  label: `Женщина`,
}];

const getValue = (value: string) => (value ? options.find((option) => option.value === value) : ``);

const animatedComponents = makeAnimated();

const RegistrationFields: FC<IRegistrationFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
  control,
}) => (
  <>
    <Field
      {...register(`email`, {
        required: `Введите почту`,
        pattern: {
          value: validEmail,
          message: `Неправильная введена почта!`,
        },
      })}
      placeholder="Почта"
      type="email"
      error={errors.email}
    />
    <Controller
      control={control}
      name="phone_number"
      defaultValue=""
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <InputMask
          mask="+7 (999) 999-99-99"
          alwaysShowMask
          value={value}
          onChange={onChange}
        >
          <Field
            type="text"
            placeholder="Номер телефона"
            error={error}
          />
        </InputMask>
      )}
    />
    <Field
      {...register(`username`, {
        required: `Введите имя`,
        minLength: {
          value: 3,
          message: `Имя должно быть больше 3 сим.!`,
        },
      })}
      placeholder="Имя"
      type="text"
      error={errors.username}
    />
    <Field
      {...register(
        `password`,
        isPasswordRequired
          ? {
            required: `Введите пароль`,
            minLength: {
              value: 6,
              message: `Пароль должен быть мин. 6 символов!`,
            },
          }
          : {},
      )}
      placeholder="Пароль"
      type="password"
      error={errors.password}
    />
    <Controller
      control={control}
      name="sex"
      rules={{
        required: `Укажите пол!`,
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <div className={styles.selectContainer}>
          <label>
            <label>Пол</label>
            <ReactSelect
              classNamePrefix="custom-select"
              placeholder="Пол"
              value={getValue(value)}
              onChange={(newValue) => onChange((newValue as IOption).value)}
              components={animatedComponents}
              options={options}
            />
          </label>
          {error && <div className={styles.error}>{error.message}</div>}
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
          onChange={onChange}
          isNoImage={false}
        />
      )}
    />

  </>
);

export default RegistrationFields;
