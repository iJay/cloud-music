import { GlobalBasicStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
// renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index.js';

import { Provider } from 'react-redux';
import store from "./store/index.js";
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
      <GlobalBasicStyle />
      <IconStyle />
      {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
