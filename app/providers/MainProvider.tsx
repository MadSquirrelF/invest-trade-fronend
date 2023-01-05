/* eslint-disable react/no-children-prop */
import Layout from '@/components/layout/Layout'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import { QueryClient, QueryClientProvider } from 'react-query'
import HeadProvider from './HeadProvider/HeadProvider'

import { Provider } from 'react-redux';
import { store } from '@/store/store'
import ReduxToast from './ReduxToast'
import AuthProvider from './AuthProvider/AuthProvider'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

//@ts-ignore
const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReduxToast />
          <AuthProvider Component={Component} children={undefined} />
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}

export default MainProvider