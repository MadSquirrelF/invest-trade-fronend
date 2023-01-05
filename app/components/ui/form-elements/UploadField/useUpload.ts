import { FileService } from "@/services/file.service"
import { toastError } from "@/utils/toastError"
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { useMutation } from "react-query"

type TypeUpload = (onChange: (...event: any[]) => void, folder?: string) => {
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
  isLoading: boolean
}


export const useUpload: TypeUpload = (onchange, folder) => {

  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync } = useMutation('upload file', (data: FormData) => FileService.upload(data, folder), {
    onSuccess: ({ data }) => {
      onchange(data[0].url)
    },
    onError: (error) => {
      toastError(error, 'Создание файла')
    }
  })

  const uploadImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files
    if (!files?.length) return
    const formData = new FormData()
    formData.append('file', files[0])
    await mutateAsync(formData)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [mutateAsync])

  return useMemo(() => ({
    uploadImage, isLoading
  }), [uploadImage, isLoading])
}