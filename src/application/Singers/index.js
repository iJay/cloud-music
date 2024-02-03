import React, { useState } from 'react'
import Horization from '../../baseUI/horization-item'
import Scroll from '../../components/scroll'
import { NavContainer, List, ListItem, ListContainer } from "./style"
import { categoryTypes, alphaTypes } from '../../api/config'

function Singers (props) {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')
  const handleUpdateAlpha = (value) => {
    setAlpha(value)
  }

  const handleUpdateCategory = (value) => {
    setCategory(value)
  }

  //mock 数据
  const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
    return {
      picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
      name: "隔壁老樊",
      accountId: 277313426,
    }
  });

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
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
      <ListContainer>
        <Scroll>
          { renderSingerList () }
        </Scroll>
      </ListContainer>
    </div>
  )
}

export default React.memo(Singers);
