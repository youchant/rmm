import dva from 'dva';
import createLoading from 'dva-loading';
import {message} from 'antd';
import './index.less';

// 1. Initialize
const app = dva({
  onError(e) {
    if (!e.response) {
      console.error(e);
    } else {
      if (e.response.status >= 200 && e.response.status < 300) {
        message.error(e.message, /* duration */3);
      } else {
        console.error(e)
      }
    }

  },
});


// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/app"));
app.model(require("./models/personals"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
