import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as actionCreators from './store/actionCreators.js';
import RecommendList from '../../components/list/index';
import Slider from '../../components/slider';
import Scroll from '../../components/scroll';
import { Content } from './style.js';

function Recommend (props) {

  const { bannerList, recommendList } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  const bannerListJS = bannerList ? bannerList.toJS() : []

  const recommendListJS = recommendList ? recommendList.toJS() : []

  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  // 不要在这里将数据toJS
  // 然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.recommend.get('bannerList'),
  recommendList: state.recommend.get('recommendList')
})

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionCreators.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionCreators.getRecommendList())
    }
  }
}

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
