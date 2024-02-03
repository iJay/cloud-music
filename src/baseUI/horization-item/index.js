import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Scroll from "../../components/scroll";
import styled from "styled-components";
import globalStyleVariables from "../../assets/global-style";

// 由于基础组件样式较少，直接写在 index.js 中
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${globalStyleVariables["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${globalStyleVariables["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${globalStyleVariables["theme-color"]};
    border: 1px solid ${globalStyleVariables["theme-color"]};
    opacity: 0.8;
  }
`


function Horization (props) {
  const { list, oldVal, title } = props;
  const { handleClick } = props;
  let Category = useRef(null)
  useEffect(() => {
    let categoryDom = Category.current;
    let tagElems = categoryDom.querySelectorAll("span")
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDom.style.width = `${totalWidth}px`;
  }, [])
  return (
    <Scroll direction={"horizental"}>
      <div ref={ Category }>
        <List>
          <span>{ title }</span>
          {
            list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected': ''}`}
                  onClick={() => handleClick (item.key)}
                >
                  { item.name }
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  );
}

Horization.defaultProps = {
  list: [],
  title: '',
  oldVal: '',
  handleClick: null
}

Horization.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  oldVal: PropTypes.string,
  handleClick: PropTypes.func
}

export default React.memo(Horization); // memo 优化函数组件性能