import Taro from '@tarojs/taro'
import Home from './pages/Home/Home';

class App extends Taro.Component {
  config: Taro.Config = {
    pages: [
      // 'pages/Home/Home',
      'pages/Sticky/Sticky',
    ],
    window: {
      navigationBarTitleText: 'DEMO',
    },
  }

  render() {
    return (
      <Home />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
