import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import ScrollContainer from './style'

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
    bsScroll.on('scrollEnd', () => {
      if (bsScroll.y <= bsScroll.maxScrollY + 100) {
        pullUp()
      }
    })
    return () => {
      bsScroll.off('scrollEnd')
    }
  }, [bsScroll, pullUp])

  // 判断用户的下拉动作
  useEffect(() => {
    if (!bsScroll || !pullUp) return
    bsScroll.on('touchEnd', (pos) => {
      if (pos.y > 50) {
        pullDown()
      }
      return () => {
        bsScroll.off('touchEnd')
      }
    })
  }, [bsScroll, pullDown, pullUp])

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

  return (
    <ScrollContainer ref={ scrollContaninerRef }>
      { props.children }
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