import { FC } from 'react'
import ReduxToastr from 'react-redux-toastr'

const ReduxToast: FC = () => {
  return (
    <ReduxToastr
      newestOnTop={false}
      preventDuplicates
      progressBar
      position="bottom-right"
      closeOnToastrClick
      timeOut={5000}
      transitionIn='bounceIn'
      transitionOut='bounceOut'
    />
  )
}

export default ReduxToast