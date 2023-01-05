import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'
import { FC, useEffect, useState } from 'react'
import { Control, Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { IProductEditInput } from './product-edit.interface'
import { useProductEdit } from './useProductEdit'

import formStyles from '../../../ui/form-elements/admin-form.module.scss'
import Buttons from '@/components/ui/form-elements/Button'


import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import dynamic from 'next/dynamic'
import { stripHtml } from 'string-strip-html'
import { useAdminCategory } from './useAdminCategory'
import { useAdminAdd } from './useAdminAdd'

import styles from '../AdminTables.module.scss'


const DynamicTextEditor = dynamic(() => import('@/components/ui/form-elements/TextEditor'), {
  ssr: false
})

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
  ssr: false
})

const ProductEdit: FC = () => {

  const { handleSubmit, register, formState: { errors }, setValue, getValues, control } = useForm<IProductEditInput>({
    mode: 'onChange'
  })

  const { isLoading, onSubmit } = useProductEdit(setValue)

  const { isLoading: isCategoryLoading, data: categories } = useAdminCategory()
  const { isLoading: isAddLoading, data: adds } = useAdminAdd()

  return (
    <Meta title='Редактирование товара'>
      <section className={styles.wrapper}>
        <div className={styles.container} style={{ marginTop: '1000px' }}>

          <AdminNavigation />

          <Heading title='Редактирование товара' />
          {isLoading ? (<SkeletonLoader count={5} />) : (
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
              <>
                <div className={formStyles.fields}>

                  <Field {...register('title', {
                    required: 'Введите название!',
                  })} placeholder="Название"
                    error={errors.title}
                    style={{ width: '45%' }} />


                  <div style={{ width: '45%' }} >
                    <SlugField register={register} error={errors.slug} generate={() => setValue('slug', generateSlug(getValues('title')))} />
                  </div>

                  <h1>ПВХ ПРОФИЛЬ</h1>

                  <Field
                    {...register('parameters.accessories')}
                    placeholder="Фурнитура"
                    error={errors.parameters?.accessories}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('parameters.number_of_sealing_contours')}
                    placeholder="Количество контуров уплотнения"
                    error={errors.parameters?.number_of_sealing_contours}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('parameters.rang')}
                    placeholder="Ранг"
                    error={errors.parameters?.rang}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('parameters.count_cell')}
                    placeholder="Количество воздушных камер"
                    error={errors.parameters?.count_cell}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('parameters.basic_profile_width')}
                    placeholder="Базовая ширина профиля "
                    error={errors.parameters?.basic_profile_width}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('parameters.color')}
                    placeholder="Цвет контура уплотнения"
                    error={errors.parameters?.color}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('parameters.double_glazed_window')}
                    placeholder="Двухкамерный стеклопакет"
                    error={errors.parameters?.double_glazed_window}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('levelSetting.lightInsulation')}
                    placeholder="Светопропускаемость"
                    error={errors.levelSetting?.lightInsulation}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('levelSetting.soundInsulation')}
                    placeholder="Звукоизоляция"
                    error={errors.levelSetting?.soundInsulation}
                    style={{ width: '31%' }}
                  />
                  <Field
                    {...register('levelSetting.warmInsulation')}
                    placeholder="Теплоизоляция"
                    error={errors.levelSetting?.warmInsulation}
                    style={{ width: '31%' }}
                  />

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
                      required: 'Укажите хотя бы одну категорию',
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
                    rules={{
                      required: 'Укажите хотя бы одну добавку',
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
                        onChange={onChange} isNoImage={false} />
                    )}
                    rules={{
                      required: 'Image is required!',
                    }}
                  />
                  <Controller
                    name="logo_image"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <UploadField
                        placeholder="Логотип изготовителя"
                        error={error}
                        folder="products"
                        image={value}
                        onChange={onChange} isNoImage={false} />
                    )}
                    rules={{
                      required: 'Logo is required!',
                    }}
                  />
                </div>


                <Controller control={control} name='description_short' defaultValue='Очень много текста примерно на три строчки, ибо больше никто читать не будет.' render={({
                  field: {
                    onChange, value
                  },
                  fieldState: { error }
                }) => (<DynamicTextEditor onChange={onChange} value={value} error={error}
                  placeholder='Короткое описание' />)}
                  rules={{
                    validate: {
                      required: (v) => (v && stripHtml(v).result.length > 0 && stripHtml(v).result.length < 250)
                        || 'Описание должно быть меньше 250 символов. Добавьте короткое описание!'
                    }
                  }}
                />
                <Controller control={control} name='description_full' defaultValue='Полное описание товара для страницы' render={({
                  field: {
                    onChange, value
                  },
                  fieldState: { error }
                }) => (<DynamicTextEditor onChange={onChange} value={value} error={error}
                  placeholder='Полное описание' />)}
                  rules={{
                    validate: {
                      required: (v) => (v && stripHtml(v).result.length > 0)
                        || 'Добавьте полное описание!'
                    }
                  }}
                />

                <Buttons>Обновить</Buttons>

              </>
            </form>)}

        </div>
      </section>
    </Meta>)
}

export default ProductEdit