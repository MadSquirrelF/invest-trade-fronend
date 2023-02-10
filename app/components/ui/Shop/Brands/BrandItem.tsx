import { setBrandId, setCurrentPage } from "@/store/filter/slice"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IBrandItem } from "./useBrands"
import Image from "next/image"
import cn from 'classnames'
import styles from './Brands.module.scss'
import { selectFilter } from "@/store/filter/selectors"
const BrandItem: FC<{ item: IBrandItem }> = ({ item }) => {

  const dispatch = useDispatch()


  const { brandIds } = useSelector(selectFilter)

  const dispatchBrand = () => {
    dispatch(setBrandId(item._id))
    dispatch(setCurrentPage(1))
  }

  return (
    <li key={item._id} onClick={() => dispatchBrand()} className={cn(styles.item, { [styles.active]: item._id === brandIds })} >
      <Image src={item.image} alt={'brand_id'} priority draggable={false} width={90} height={40} />
    </li>
  )
}

export default BrandItem