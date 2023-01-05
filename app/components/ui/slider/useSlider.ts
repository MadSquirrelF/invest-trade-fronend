
import { current } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"

export const useSlider = (length: number) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [slideIn, setSlideIn] = useState(true)

  const isExistsNext = currentIdx + 1 < length

  const isExistsPrev = currentIdx ? currentIdx - 1 < length : false
  useEffect(() => {
    const interval = setInterval(() => {
      isExistsNext ? handleArrowClick('next') : setCurrentIdx(0)
    }, 10000)

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExistsNext, currentIdx])



  const handleArrowClick = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' ? currentIdx + 1 : currentIdx - 1
    setSlideIn(false)

    setTimeout(() => {
      setCurrentIdx(newIndex)
      setSlideIn(true)
    }, 300)
  }

  return { slideIn, index: currentIdx, isNext: isExistsNext, isPrev: isExistsPrev, handleArrowClick: handleArrowClick }


}