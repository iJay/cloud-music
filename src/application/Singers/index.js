import React, { useState } from 'react';
import Horization from '../../baseUI/horization-item';
import { NavContainer } from "./style";
import { categoryTypes, alphaTypes } from '../../api/config';

function Singers (props) {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')
  const handleUpdateAlpha = (value) => {
    setAlpha(value)
  }

  const handleUpdateCategory = (value) => {
    setCategory(value)
  }
  return (
    <NavContainer>
      <Horization 
        list={categoryTypes} 
        title={"分类 (默认热门):"}
        oldVal={ category }
        handleClick={ handleUpdateCategory }
      ></Horization>
      <Horization
        list={alphaTypes}
        title={"首字母:"}
        oldVal={ alpha }
        handleClick={ handleUpdateAlpha }
      ></Horization>
    </NavContainer>
  )
}

export default React.memo(Singers);
