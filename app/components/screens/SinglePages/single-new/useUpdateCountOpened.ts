import { NewService } from '@/services/new.service'
import { useEffect } from 'react'
import { useMutation } from 'react-query'



export const useUpdateCountOpened = (slug: string) => {
  const { mutateAsync } = useMutation('update new count view', () =>
    NewService.updateCountOpened(slug)
  )

  useEffect(() => {
    mutateAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}