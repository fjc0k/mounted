import './Home.scss'
import Taro, { ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { ComponentName } from '../components'
import { Image, Text, View } from '@tarojs/components'
import { imgLogo } from './assets'
import { pageUrls } from '.'
import { XItem, XList } from './components'

interface ComponentInfo {
  name: ComponentName,
  chineseName: string,
  url: string,
}

const componentList: ComponentInfo[] = [
  {
    name: 'Sticky',
    chineseName: '内容吸顶',
    url: pageUrls.Sticky,
  },
  {
    name: 'Transition',
    chineseName: '动画过渡',
    url: pageUrls.Transition,
  },
  {
    name: 'Popup',
    chineseName: '弹出层',
    url: pageUrls.Popup,
  },
  {
    name: 'Picker',
    chineseName: '选择器',
    url: pageUrls.Picker,
  },
  {
    name: 'PickerView',
    chineseName: '选择器视图',
    url: pageUrls.PickerView,
  },
  {
    name: 'SinglePicker',
    chineseName: '单项选择器',
    url: pageUrls.SinglePicker,
  },
  {
    name: 'DatePicker',
    chineseName: '日期选择器',
    url: pageUrls.DatePicker,
  },
  {
    name: 'TimePicker',
    chineseName: '时间选择器',
    url: pageUrls.TimePicker,
  },
  {
    name: 'ECharts',
    chineseName: 'ECharts 图表',
    url: pageUrls.ECharts,
  },
]

export default class Home extends component({
  disableGlobalClass: true,
}) {
  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'Mounted 小程序组件库',
      path: pageUrls.Home,
    }
  }

  handleItemClick = (index: number) => {
    Taro.navigateTo({
      url: componentList[index].url,
    })
  }

  render() {
    return (
      <View className='page'>
        {/* Logo */}
        <View className='logo'>
          <Image
            src={imgLogo}
            mode='widthFix'
            className='image'
          />
          <View className='desc'>
            <Text>一款基于 Taro 的小程序组件库。</Text>
          </View>
        </View>
        {/* 组件列表 */}
        <XList>
          {componentList.map((componentInfo, index) => (
            <XItem
              key={componentInfo.name}
              arrow={true}
              extra={componentInfo.chineseName}
              feedback={true}
              title={componentInfo.name}
              onClick={this.handleItemClick.bind(this, index)}
            />
          ))}
        </XList>
      </View>
    )
  }
}
