import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import "swiper/dist/css/swiper.css";

import { SliderContainer } from './style';

function Slider (props) {
  const { bannerList } = props
  const [slideOptionObj, setSlideOptionObj] = useState(null)
  useEffect(() => {
    if(bannerList.length && !slideOptionObj) {
      let newSlideOptionObj = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el: '.swiper-pagination'},
      })
      setSlideOptionObj(newSlideOptionObj)
    }
  }, [bannerList.length, slideOptionObj])
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider);