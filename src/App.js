import { GlobalBasicStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
function App() {
  return (
    <div className="app">
      <GlobalBasicStyle />
      <IconStyle />
      <h3>Hello World!<i className="iconfont">&#xe62b;</i></h3>
    </div>
  );
}

export default App;
