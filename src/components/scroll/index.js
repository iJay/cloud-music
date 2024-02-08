import { forwardRef, useState, useRef, useEffect, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import { ScrollContainer, PullDownLoading, PullUpLoading} from './style'
import Loading from '../../baseUI/loading/index'
import LoadingV2 from '../../baseUI/loading-v2/index'
import { debounce } from '../../utils/index'

const Scroll = forwardRef ((props, ref) => {
  const [bsScroll, setBsScroll] = useState(null)
  const scrollContaninerRef = useRef()

  const {direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom} = props
  const {pullUp, pullDown, onScroll} = props

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    setBsScroll(scroll)
    return () => {
      setBsScroll(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bsScroll) {
      bsScroll.refresh()
    }
  })

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp])

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])

  // 绑定scroll事件
  useEffect(() => {
    if (!onScroll || !bsScroll) return
    bsScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bsScroll.off('scroll')
    }
  }, [onScroll, bsScroll])

  // 判断是否滑动到了底部
  useEffect(() => {
    if (!bsScroll || !pullUp) return
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if(bsScroll.y <= bsScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    }
    bsScroll.on('scrollEnd', handlePullUp)
    return () => {
      bsScroll.off('scrollEnd', handlePullUp)
    }
  }, [bsScroll, pullUp, pullUpDebounce])

  // 判断用户的下拉动作
  useEffect(() => {
    if (!bsScroll || !pullDown) return
    const handlePullDown = (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDownDebounce();
      }
    }
    bsScroll.on('touchEnd', handlePullDown)
    return () => {
      bsScroll.off('touchEnd', handlePullDown)
    }
  }, [bsScroll, pullDown, pullDownDebounce])

  useImperativeHandle(ref, () => ({
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBsScroll: () => {
      if (bsScroll) {
        return bsScroll
      }
    },

    // 给外界暴露 refresh 方法，提供刷新 bs 实例
    refresh: () => {
      if (bsScroll) {
        bsScroll.refresh()
        bsScroll.scrollTo(0, 0)
      }
    }
  }))

  const PullUpdisplayStyle = pullUpLoading ? {display: ""} : { display:"none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: ""} : { display:"none" };
  return (
    <ScrollContainer ref={ scrollContaninerRef }>
      { props.children }
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={ PullDowndisplayStyle }><LoadingV2></LoadingV2></PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),// 滚动的方向
  click: PropTypes.bool,// 是否支持点击
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滚动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool,// 是否支持向下吸底
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
}

export default Scroll;