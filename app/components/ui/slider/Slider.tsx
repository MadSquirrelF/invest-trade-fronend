import { FC, useEffect, useState } from 'react'
import { ISlide, ISlider } from './slider.interface'
import { useSlider } from './useSlider'
import styles from './Slider.module.scss'
import SlideArrow from './SlideArrow/SlideArrow'
import SlideItem from './SlideItem'
import { CSSTransition } from 'react-transition-group'



const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
  const { slideIn, index, isNext, isPrev, handleArrowClick } = useSlider(slides.length)

  return (
    <div className={styles.slider}>
      <CSSTransition in={slideIn} classNames='slide-animation' timeout={300} unmountOnExit>
        <SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
      </CSSTransition>




      {isPrev && <SlideArrow variant='left'
        clickHandler={() => handleArrowClick('prev')} />}
      {isNext && <SlideArrow variant='right'
        clickHandler={() => handleArrowClick('next')} />}
    </div>
  )
}

export default Slider