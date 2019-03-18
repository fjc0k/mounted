import './app.scss'
import Taro from '@tarojs/taro'
import { component } from './components/component'

class App extends component() {
  config: Taro.Config = {
    pages: [
      // @index('./pages/*.tsx', (pp, cc) => `'${pp.path.replace(/^\.\//, '')}',`)
      'pages/Home',
      'pages/Sticky',
      // @endindex
    ],
    window: {
      navigationBarTitleText: 'Mounted',
      navigationBarBackgroundColor: '#1AAD19',
      navigationBarTextStyle: 'white',
      backgroundColor: '#E8E8E8',
    },
  }

  render(): any {
    return null
  }
}

Taro.render(<App />, document.getElementById('app'))
