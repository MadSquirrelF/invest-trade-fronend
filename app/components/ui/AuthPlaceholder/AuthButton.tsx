import { setLogin, showModal } from '@/store/modal/modal.slice'
import { useDispatch } from 'react-redux'

import styles from './AuthPlaceholder.module.scss'

const AuthButton = () => {
  const dispatch = useDispatch()
  const ShowLogin = () => {
    dispatch(setLogin());
    dispatch(showModal())
  }
  return (
    <div onClick={() => ShowLogin()}>
      <span className={styles.btn}>Войти</span>
    </div>
  )
}

export default AuthButton
