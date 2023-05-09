import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';
import { generateSlug } from '@/utils/string/generateSlug';
import { IBrandEditInput } from './brand-edit.interface';
import { useBrandEdit } from './useBrandEdit';
import formStyles from '../../../ui/form-elements/admin-form.module.scss';
import UploadField from '@/components/ui/form-elements/UploadField/UploadField';
import styles from '../AdminTables.module.scss';
import Button from '@/components/ui/form-elements/Button';

const BrandEdit: FC = () => {
  const {
    handleSubmit, register, formState: { errors }, setValue, getValues, control,
  } = useForm<IBrandEditInput>({
    mode: `onChange`,
  });

  const { isLoading, onSubmit } = useBrandEdit(setValue);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        <AdminNavigation />

        <Heading title="Редактирование брендов" />

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

                <Controller
                  name="logo_image"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UploadField
                      placeholder="Логотип"
                      error={error}
                      folder="brands"
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

export default BrandEdit;
