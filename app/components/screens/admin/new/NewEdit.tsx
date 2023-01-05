
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import Heading from '@/components/ui/heading/Heading'
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader'
import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { INewEditInput } from './new-edit.interface'
import { useNewEdit } from './useNewEdit'

import formStyles from '../../../ui/form-elements/admin-form.module.scss'


import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import dynamic from 'next/dynamic'
import { stripHtml } from 'string-strip-html'
import styles from '../AdminTables.module.scss'
import Button from '@/components/ui/form-elements/Button'


const DynamicTextEditor = dynamic(() => import('@/components/ui/form-elements/TextEditor'), {
  ssr: false
})

const NewEdit: FC = () => {

  const { handleSubmit, register, formState: { errors }, setValue, getValues, control } = useForm<INewEditInput>({
    mode: 'onChange'
  })

  const { isLoading, onSubmit } = useNewEdit(setValue)

  return (
    <Meta title='Редактирование новостей'>
      <section className={styles.wrapper}>
        <div className={styles.container} style={{ marginTop: '600px' }}>

          <AdminNavigation />

          <Heading title='Редактирование новостей' />

          <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
            {isLoading ? <SkeletonLoader count={3} /> : <>
              <div className={formStyles.fields}>

                <Field {...register('title', {
                  required: 'Введите заголовок!',
                })} placeholder="Заголовок"
                  error={errors.title}
                  style={{ width: '31%' }} />


                <div style={{ width: '31%' }} >
                  <SlugField register={register} error={errors.slug} generate={() => setValue('slug', generateSlug(getValues('title')))} />
                </div>

                <Field {...register('username', {
                  required: 'Введите ваше имя!',
                })} placeholder="Имя"
                  error={errors.username}
                  style={{ width: '31%' }} />

                <Controller
                  name="image_1"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UploadField
                      placeholder="Главное изображение"
                      error={error}
                      folder="news"
                      image={value}
                      onChange={onChange} isNoImage={false} />
                  )}
                  rules={{
                    required: 'Добавьте изображение!',
                  }}
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
                      placeholder="Второе изображение"
                      error={error}
                      folder="news"
                      image={value}
                      onChange={onChange} isNoImage={false} />
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
                      placeholder="Третье изображение"
                      error={error}
                      folder="news"
                      image={value}
                      onChange={onChange} isNoImage={false} />
                  )}
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
                    required: (v) => (v && stripHtml(v).result.length > 0 && stripHtml(v).result.length < 151)
                      || 'Описание должно быть меньше 100 символов. Добавьте короткое описание!'
                  }
                }}
              />
              <Controller control={control} name='description_full' defaultValue='' render={({
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

              <Button>Обновить</Button>

            </>}
          </form>
        </div>
      </section>

    </Meta>)
}

export default NewEdit