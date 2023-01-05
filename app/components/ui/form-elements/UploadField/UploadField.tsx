import { FC } from 'react'
import { IUploadField } from '../form.interface'
import { useUpload } from './useUpload'
import cn from 'classnames'
import styles from '../form.module.scss'
import SkeletonLoader from '../../heading/SkeletonLoader'
import Image from 'next/image'


const UploadField: FC<IUploadField> = ({ error, onChange, image, folder, placeholder, style, isNoImage = false }) => {

  //@ts-ignore
  const { isLoading, uploadImage } = useUpload(onChange, folder)

  return <div className={cn(styles.field, styles.UploadField)} style={style}>
    <div className={styles.uploadFlex}>
      <div className={styles.content}>
        <label>{placeholder}</label>
        <input type='file' onChange={uploadImage} />
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
      {!isNoImage && (<div className={styles.uploadImageContainer}>
        {isLoading ? <SkeletonLoader count={1} className='w-full h-full' /> : image && <Image alt='' src={image} fill unoptimized />}
      </div>)}
    </div>

  </div>
}

export default UploadField