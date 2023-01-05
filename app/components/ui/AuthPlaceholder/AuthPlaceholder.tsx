import styles from './AuthPlaceholder.module.scss'
import AuthButton from './AuthButton'

const AuthPlaceholder = () => {
  return (
    <div className={styles.placeholder}>
      <div>
        <div>Вы должны быть авторизованны,чтобы воспользоваться этим</div>
        <AuthButton />
      </div>
    </div>
  )
}

export default AuthPlaceholder
