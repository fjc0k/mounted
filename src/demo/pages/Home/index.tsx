import './index.scss'
import Taro, {useShareAppMessage} from '@tarojs/taro'
import {ComponentName} from '../../../components'
import {Image, Text, View} from '@tarojs/components'
import {imgLogo} from '../../assets'
import {pageUrls} from '..'
import {XItem, XList, XNavigationBar} from '../../components'

interface ComponentInfo {
  name: ComponentName,
  chineseName: string,
  url: string,
}

const componentList: ComponentInfo[] = [
  {
    name: 'Sticky',
    chineseName: '内容吸顶',
    url: pageUrls.StickyIndex,
  },
  {
    name: 'Transition',
    chineseName: '动画过渡',
    url: pageUrls.TransitionIndex,
  },
  {
    name: 'Popup',
    chineseName: '弹出层',
    url: pageUrls.PopupIndex,
  },
  {
    name: 'Picker',
    chineseName: '选择器',
    url: pageUrls.PickerIndex,
  },
  {
    name: 'PickerView',
    chineseName: '选择器视图',
    url: pageUrls.PickerViewIndex,
  },
  {
    name: 'SinglePicker',
    chineseName: '单项选择器',
    url: pageUrls.SinglePickerIndex,
  },
  {
    name: 'DatePicker',
    chineseName: '日期选择器',
    url: pageUrls.DatePickerIndex,
  },
  {
    name: 'TimePicker',
    chineseName: '时间选择器',
    url: pageUrls.TimePickerIndex,
  },
  {
    name: 'ECharts',
    chineseName: 'ECharts 图表',
    url: pageUrls.EChartsIndex,
  },
]

export default function Home() {
  useShareAppMessage(() => ({
    title: 'Mounted',
    path: pageUrls.HomeIndex,
  }))

  const handleItemClick = (index: number) => {
    Taro.navigateTo({
      url: componentList[index].url,
    })
  }

  return (
    <View className='page'>
      <XNavigationBar>Mounted</XNavigationBar>

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
            extra={componentInfo.chineseName}
            title={componentInfo.name}
            arrow={true}
            feedback={true}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </XList>
    </View>
  )
}
