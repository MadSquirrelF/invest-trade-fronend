import { ProductService } from '@/services/product.service'
import { useEffect } from 'react'
import { useMutation } from 'react-query'


export const useUpdateCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation('update product count opened', () =>
    ProductService.updateCountOpened(slug)
  )

  useEffect(() => {
    mutateAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
