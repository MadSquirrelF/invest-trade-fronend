import { FC } from 'react';
import {
  Controller, useFieldArray, useForm,
} from 'react-hook-form';
import dynamic from 'next/dynamic';
import { stripHtml } from 'string-strip-html';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';

import { generateSlug } from '@/utils/string/generateSlug';
import { IProductEditInput } from './product-edit.interface';
import { useProductEdit } from './useProductEdit';

import formStyles from '../../../ui/form-elements/admin-form.module.scss';

import UploadField from '@/components/ui/form-elements/UploadField/UploadField';
import { useAdminCategory } from './useAdminCategory';
import { useAdminAdd } from './useAdminAdd';

import styles from '../AdminTables.module.scss';
import { useAdminBrand } from './useAdminBrand';
import Button from '@/components/ui/form-elements/Button';

const DynamicTextEditor = dynamic(() => import(`@/components/ui/form-elements/TextEditor`), {
  ssr: false,
});

const DynamicSelect = dynamic(() => import(`@/components/ui/select/Select`), {
  ssr: false,
});

const ProductEdit: FC = () => {
  const {
    handleSubmit, register, formState: { errors }, setValue, getValues, control,
  } = useForm<IProductEditInput>({
    mode: `onChange`,
    defaultValues: {
      details: [{
        name: `Название характеристики`,
        value: `Значение в текст`,
      }],
    },
  });
  const {
    fields, append, prepend, remove,
  } = useFieldArray({
    name: `details`,
    control,
  });

  const { isLoading, onSubmit } = useProductEdit(setValue);

  const { isLoading: isCategoryLoading, data: categories } = useAdminCategory();
  const { isLoading: isAddLoading, data: adds } = useAdminAdd();
  const { isLoading: isBrandLoading, data: brands } = useAdminBrand();

  return (
    <section className={styles.wrapper}>
      <div
        className={styles.container}
        style={{ marginTop: `1000px` }}
      >

        <AdminNavigation />

        <Heading title="Редактирование товара" />
        {isLoading ? (<SkeletonLoader count={5} />) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={formStyles.form}
          >
            <div className={formStyles.fields}>

              <Field
                {...register(`title`, {
                  required: `Введите название!`,
                })}
                placeholder="Название"
                error={errors.title}
                style={{ width: `45%` }}
              />

              <div style={{ width: `45%` }}>
                <SlugField
                  register={register}
                  error={errors.slug}
                  generate={() => setValue(`slug`, generateSlug(getValues(`title`)))}
                />
              </div>

              <Controller
                name="category"
                control={control}
                render={({
                  field,
                  fieldState: { error },
                }) => (
                  <DynamicSelect
                    field={field}
                    placeholder="Категории"
                    error={error}
                    isLoading={isCategoryLoading}
                    isMulti
                    options={categories || []}
                  />
                )}
                rules={{
                  required: `Укажите хотя бы одну категорию`,
                }}
              />
              <Controller
                name="add"
                control={control}
                render={({
                  field,
                  fieldState: { error },
                }) => (
                  <DynamicSelect
                    field={field}
                    placeholder="Добавки"
                    error={error}
                    isLoading={isAddLoading}
                    isMulti
                    options={adds || []}
                  />
                )}
              />
              <Controller
                name="brand"
                control={control}
                render={({
                  field,
                  fieldState: { error },
                }) => (
                  <DynamicSelect
                    field={field}
                    placeholder="Бренд"
                    error={error}
                    isLoading={isBrandLoading}
                    isMulti
                    options={brands || []}
                  />
                )}
                rules={{
                  required: `Укажите хотя бы один бренд`,
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
                    placeholder="Изображение товара"
                    error={error}
                    folder="products"
                    image={value}
                    onChange={onChange}
                    isNoImage={false}
                  />
                )}
                rules={{
                  required: `Image is required!`,
                }}
              />
              <div>
                <p>
                  Если хотите сделать товар доступным для покупки, оставьте кнопку
                  <b> Товар на складе</b>
                  .
                </p>

                <Controller
                  control={control}
                  name="is_available"
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(!field.value);
                      }}
                      className="btn-primary px-4 p-2 block mb-7"
                    >
                      {field.value ? `Товар на складе` : `Товар недоступен`}
                    </button>
                  )}
                />
              </div>
            </div>
            <div className={formStyles.details}>
              <h1>Характеристики</h1>
              {fields.map((field, index) => (
                <section key={field.id}>
                  <Field
                    {...register(`details.${index}.name`, {
                    })}
                    placeholder="Название характеристики"
                    error={errors.title}
                    style={{
                      width: `20%`,
                      marginRight: `20px`,
                    }}
                  />
                  <Field
                    {...register(`details.${index}.value`, {
                    })}
                    placeholder="Значение характеристики"
                    error={errors.title}
                    style={{
                      width: `20%`,
                      marginRight: `20px`,
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Удалить
                  </Button>
                </section>
              ))}
              <Button
                type="button"
                style={{ marginRight: `10px` }}
                onClick={() => {
                  append({
                    name: `Новая характеристика`,
                    value: `в начале`,
                  });
                }}
              >
                Добавить в начало
              </Button>
              <Button
                type="button"
                style={{ marginRight: `10px` }}
                onClick={() => {
                  prepend({
                    name: `Новая характеристика`,
                    value: `в конце`,
                  });
                }}
              >
                Добавить в конец
              </Button>
            </div>

            <Controller
              control={control}
              name="description_short"
              defaultValue="Очень много текста примерно на три строчки, ибо больше никто читать не будет."
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
                  required: (v) => (v && stripHtml(v).result.length > 0 && stripHtml(v).result.length < 250)
                        || `Описание должно быть меньше 250 символов. Добавьте короткое описание!`,
                },
              }}
            />
            <Controller
              control={control}
              name="description_full"
              defaultValue="Полное описание товара для страницы"
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
                        || `Добавьте полное описание!`,
                },
              }}
            />

            <Button>Обновить</Button>
          </form>
        )}

      </div>
    </section>
  );
};

export default ProductEdit;
