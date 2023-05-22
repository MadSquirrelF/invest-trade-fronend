import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';
import { generateSlug } from '@/utils/string/generateSlug';
import { IAddEditInput } from './add-edit.interface';
import { useAddEdit } from './useAddEdit';

import formStyles from '../../../ui/form-elements/admin-form.module.scss';

import UploadField from '@/components/ui/form-elements/UploadField/UploadField';

import styles from '../AdminTables.module.scss';
import Button from '@/components/ui/form-elements/Button';

const AddEdit: FC = () => {
  const {
    handleSubmit, register, formState: { errors }, setValue, getValues, control,
  } = useForm<IAddEditInput>({
    mode: `onChange`,
  });

  const { isLoading, onSubmit } = useAddEdit(setValue);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        <AdminNavigation />

        <Heading title="Редактирование добавок" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={formStyles.form}
        >
          {isLoading ? <SkeletonLoader count={3} /> : (
            <>
              <div className={formStyles.fields}>

                <Field
                  {...register(`name`, {
                    required: `Введите название!`,
                  })}
                  placeholder="Название"
                  error={errors.name}
                  style={{ width: `31%` }}
                />

                <div style={{ width: `31%` }}>
                  <SlugField
                    register={register}
                    error={errors.slug}
                    generate={() => setValue(`slug`, generateSlug(getValues(`name`)))}
                  />
                </div>

                <Field
                  type="number"
                  {...register(`price`, {
                    required: `Введите цену`,
                    valueAsNumber: true,
                  })}
                  placeholder="Цена"
                  error={errors.price}
                  style={{ width: `31%` }}
                />

                <Controller
                  name="photo"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UploadField
                      placeholder="Изображение"
                      error={error}
                      folder="adds"
                      image={value}
                      onChange={onChange}
                      isNoImage={false}
                    />
                  )}
                  rules={{
                    required: `Photo is required!`,
                  }}
                />
              </div>

              <Button>Обновить</Button>

            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default AddEdit;
