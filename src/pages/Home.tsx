import './Home.scss'
import Taro from '@tarojs/taro'
import { component } from '../components/component'
import { ComponentName } from '../components'
import { iconLogo } from './assets'
import { Image, Text, View } from '@tarojs/components'
import { pageUrls } from '.'
import { XItem, XList } from './components'

interface ComponentInfo {
  name: ComponentName,
  chineseName: string,
  url: string,
}

const componentList: ComponentInfo[] = [
  {
    name: 'FormIdCollector',
    chineseName: 'formId 收集器',
    url: '',
  },
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
    name: 'PickerView',
    chineseName: '选择器视图',
    url: pageUrls.PickerView,
  },
]

export default class Home extends component({
  disableGlobalClass: true,
}) {
  handleItemClick = (index: number) => {
    wx.navigateTo({
      url: componentList[index].url,
    })
  }

  render() {
    return (
      <View className='page'>
        {/* Logo */}
        <View className='logo'>
          <Image
            src={iconLogo}
            mode='widthFix'
            className='image'
          />
          <View className='desc'>
            <Text>一款基于 Taro 的微信小程序组件库。</Text>
          </View>
        </View>
        {/* 组件列表 */}
        <XList>
          {componentList.map((componentInfo, index) => (
            <XItem
              key={componentInfo.name}
              title={componentInfo.name}
              extra={componentInfo.chineseName}
              arrow={true}
              feedback={true}
              onClick={this.handleItemClick.bind(this, index)}
            />
          ))}
        </XList>
      </View>
    )
  }
}
