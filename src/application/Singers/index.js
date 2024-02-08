import React, { useEffect, useState, useCallback } from 'react'
import  LazyLoad, {forceCheck} from 'react-lazyload';
import Horization from '../../baseUI/horization-item'
import Scroll from '../../components/scroll'
import { NavContainer, List, ListItem, ListContainer } from "./style"
import Loading from '../../baseUI/loading'
import { categoryTypes, alphaTypes } from '../../api/config'
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  singerList: state.singers.getIn(['singerList']).toJS(),
  enterLoading: state.singers.getIn(['enterLoading']),
  pullUpLoading: state.singers.getIn(['pullUpLoading']),
  pullDownLoading: state.singers.getIn(['pullDownLoading']),
  pageCount: state.singers.getIn(['pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)) // 由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)) // loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha))
    },
    // 滑到最底部刷新部分的处理
    pullDownRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    // 顶部下拉刷新
    pullUpRefreshDispatch(category, alpha) {
      dispatch(changePullUpLoading(true));
      // 重新获取数据
      dispatch(changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
}

function Singers (props) {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  const { 
    enterLoading,
    pageCount,
    updateDispatch,
    singerList,
    getHotSingerDispatch,
    pullUpLoading,
    pullDownLoading,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch
  } = props;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateAlpha = useCallback((value) => {
    setAlpha(value)
    updateDispatch(category, value);
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateCategory = useCallback((value) => {
    setCategory(value)
    updateDispatch(value, alpha);
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePullUp = useCallback(() => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePullDown = useCallback(() => {
    pullDownRefreshDispatch(category, alpha, category === '', 0);
  })

  // 初次加载页面获取热门歌手
  useEffect(() => {
    getHotSingerDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
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
        <Scroll
          pullDown={ handlePullDown }
          pullUp={ handlePullUp }
          pullDownLoading={ pullDownLoading }
          pullUpLoading={ pullUpLoading }
          onScroll={forceCheck}
        >
          { renderSingerList () }
        </Scroll>
        <Loading show={ enterLoading }></Loading>
      </ListContainer>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
