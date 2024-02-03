import { combineReducers } from "redux";
import recommendReducer from "../application/Recommend/store/reducer";
export default combineReducers({
  recommend: recommendReducer
  // 开发具体功能模块的时候添加 reducer
});