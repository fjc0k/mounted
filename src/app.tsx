import './app.scss'
import Taro from '@tarojs/taro'
import { component } from './components/component'

class App extends component() {
  config: Taro.Config = {
    pages: [
      'pages/Home',
      // @index('./pages/*[!Home].tsx', (pp, cc) => `'${pp.path.replace(/^\.\//, '')}',`)
      'pages/Picker',
      'pages/PickerView',
      'pages/Popup',
      'pages/Sticky',
      'pages/Transition',
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
