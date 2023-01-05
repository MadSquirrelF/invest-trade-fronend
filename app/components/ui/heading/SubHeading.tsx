import { FC } from 'react'

const SubHeading: FC<{ title: string }> = ({ title }) => {
  return <h2 className='text-black text-2xl mb-5 font-bold'>{title}</h2>
}

export default SubHeading