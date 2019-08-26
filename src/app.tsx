import './app.scss'
import Home from './demo/pages/Home'
import Taro from '@tarojs/taro'

class App extends Taro.Component {
  config: Taro.Config = {
    pages: [
      'demo/pages/Home/index',
      // @index(['./demo/pages/[A-Z]*/*.tsx', '!./demo/pages/Home'], (pp, cc) => `'${pp.path.replace(/^\.\//, '')}',`)
      'demo/pages/DatePicker/index',
      'demo/pages/ECharts/index',
      'demo/pages/Picker/index',
      'demo/pages/PickerView/index',
      'demo/pages/Popup/index',
      'demo/pages/SinglePicker/index',
      'demo/pages/Sticky/index',
      'demo/pages/TimePicker/index',
      'demo/pages/Transition/index',
      // @endindex
    ],
    window: {
      navigationBarTitleText: 'Mounted',
      navigationBarTextStyle: 'white',
      backgroundColor: '#E8E8E8',
      navigationStyle: 'custom',
    },
  }

  render() {
    return (
      <Home />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
