import { combineReducers } from "redux";
import { recommendReducer } from "../application/Recommend/store/index";
import { singersReducer } from '../application/Singers/store/index'
export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer
  // 开发具体功能模块的时候添加 reducer
});