import './app.scss'
import Home from './pages/Home'
import Taro from '@tarojs/taro'

class App extends Taro.Component {
  config: Taro.Config = {
    pages: [
      // @index('./pages/*.tsx', (pp, cc) => `'${pp.path.replace(/^\.\//, '')}',`)
      'pages/Home',
      'pages/Picker',
      'pages/PickerView',
      'pages/Popup',
      'pages/SinglePicker',
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

  render() {
    return (
      <Home />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
