import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { stripHtml } from 'string-strip-html';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';
import Meta from '@/utils/meta/Meta';
import { generateSlug } from '@/utils/string/generateSlug';
import { IWorkEditInput } from './work-edit.interface';
import { useWorkEdit } from './useWorkEdit';

import formStyles from '../../../ui/form-elements/admin-form.module.scss';

import UploadField from '@/components/ui/form-elements/UploadField/UploadField';
import styles from '../AdminTables.module.scss';
import Button from '@/components/ui/form-elements/Button';

const DynamicTextEditor = dynamic(() => import(`@/components/ui/form-elements/TextEditor`), {
  ssr: false,
});

const WorkEdit: FC = () => {
  const {
    handleSubmit, register, formState: { errors }, setValue, getValues, control,
  } = useForm<IWorkEditInput>({
    mode: `onChange`,
  });

  const { isLoading, onSubmit } = useWorkEdit(setValue);

  return (
    <Meta title="Редактирование портфолио">
      <section className={styles.wrapper}>
        <div
          className={styles.container}
          style={{ marginTop: `800px` }}
        >

          <AdminNavigation />

          <Heading title="Редактирование портфолио" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={formStyles.form}
          >
            {isLoading ? <SkeletonLoader count={3} /> : (
              <>
                <div className={formStyles.fields}>

                  <Field
                    {...register(`title`, {
                      required: `Введите заголовок!`,
                    })}
                    placeholder="заголовок"
                    error={errors.title}
                    style={{ width: `31%` }}
                  />

                  <div style={{ width: `31%` }}>
                    <SlugField
                      register={register}
                      error={errors.slug}
                      generate={() => setValue(`slug`, generateSlug(getValues(`title`)))}
                    />
                  </div>

                  <Controller
                    name="poster"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Постер для главной страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                    rules={{
                      required: `Worker is required!`,
                    }}
                  />

                  <Controller
                    name="image_1"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Первое изображение страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                  />

                  <Controller
                    name="image_2"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Второе изображение страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                  />

                  <Controller
                    name="image_3"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Третье изображение страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                  />

                  <Controller
                    name="image_4"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Четвертое изображение страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                  />

                  <Controller
                    name="image_5"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Пятое изображение страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                  />

                  <Controller
                    name="image_6"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Шестое изображение страницы"
                        error={error}
                        folder="posts"
                        image={value}
                        onChange={onChange}
                        isNoImage={false}
                      />
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="description_short"
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
                      placeholder="Короткое описание"
                    />
                  )}
                  rules={{
                    validate: {
                      required: (v) => (v && stripHtml(v).result.length > 0 && stripHtml(v).result.length < 200)
                        || `Описание должно быть меньше 100 символов. Добавьте короткое описание!`,
                    },
                  }}
                />

                <Controller
                  control={control}
                  name="description_full"
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
                      placeholder="Полное описание"
                    />
                  )}
                  rules={{
                    validate: {
                      required: (v) => (v && stripHtml(v).result.length > 0)
                      || `Description is required!`,
                    },
                  }}
                />

                <Button>Обновить</Button>

              </>
            )}
          </form>
        </div>
      </section>

    </Meta>
  );
};

export default WorkEdit;
