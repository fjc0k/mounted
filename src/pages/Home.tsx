import './Home.scss'
import { View, Image, Text } from '@tarojs/components'
import { component } from '../components/component'
import { ComponentName } from '../components'
import { iconLogo } from './assets'
import { XList, XItem } from './components'
import { pageUrls } from '.'

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
