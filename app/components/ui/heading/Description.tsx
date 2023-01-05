import { FC } from 'react'
import cn from 'classnames'
import { stripHtml } from 'string-strip-html'
const Description: FC<{ text: string, className?: string }> = ({ text, className = '' }) => {
  return (
    <div className={cn('text-lg font-medium bg-transparent text-gray-500', className)}>
      {stripHtml(text).result}
    </div>
  )
}

export default Description