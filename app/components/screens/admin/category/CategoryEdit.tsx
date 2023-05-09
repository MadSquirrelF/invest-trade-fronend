import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';
import dynamic from 'next/dynamic';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';
import { generateSlug } from '@/utils/string/generateSlug';
import { ICategoryEditInput } from './category-edit.interface';
import { useCategoryEdit } from './useCategoryEdit';

import formStyles from '../../../ui/form-elements/admin-form.module.scss';
import Buttons from '@/components/ui/form-elements/Button';

import styles from '../AdminTables.module.scss';
import UploadField from '@/components/ui/form-elements/UploadField/UploadField';

const DynamicTextEditor = dynamic(() => import(`@/components/ui/form-elements/TextEditor`), {
  ssr: false,
});

const CategoryEdit: FC = () => {
  const {
    handleSubmit, register, formState: { errors }, setValue, getValues, control,
  } = useForm<ICategoryEditInput>({
    mode: `onChange`,
  });

  const { isLoading, onSubmit } = useCategoryEdit(setValue);
  return (

    <section className={styles.wrapper}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title="Редактирование категорий" />
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
                  type="text"
                  style={{ width: `31%` }}
                />

                <div style={{ width: `31%` }}>
                  <SlugField
                    register={register}
                    error={errors.slug}
                    generate={() => setValue(`slug`, generateSlug(getValues(`name`)))}
                  />
                </div>

              </div>

              <Controller
                control={control}
                name="description"
                defaultValue=""
                render={({
                  field: {
                    onChange, value,
                  },
                  fieldState: { error },
                }) => (
                  <DynamicTextEditor
                    onChange={onChange}
                    value={value}
                    error={error}
                    placeholder="Описание"
                  />
                )}
                rules={{
                  validate: {
                    required: (v) => (v && stripHtml(v).result.length > 0)
                    || `Description is required!`,
                  },
                }}
              />

              <Controller
                name="image"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    placeholder="Изображение"
                    error={error}
                    folder="categories"
                    image={value}
                    onChange={onChange}
                    isNoImage={false}
                  />
                )}
                rules={{
                  required: `Image is required!`,
                }}
              />

              <Buttons>Обновить</Buttons>

            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default CategoryEdit;
