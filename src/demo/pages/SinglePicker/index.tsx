import Taro, { useShareAppMessage, useState } from '@tarojs/taro'
import { MSinglePicker, MSinglePickerData } from '../../../components'
import { pageUrls } from '..'
import { View } from '@tarojs/components'
import { XItem, XList, XNavigationBar, XTitle } from '../../components'

const countryData: MSinglePickerData = [
  {
    label: '中国',
    value: '中国',
  },
  {
    label: '美国',
    value: '美国',
  },
  {
    label: '俄罗斯',
    value: '俄罗斯',
  },
  {
    label: '奥地利',
    value: '奥地利',
  },
]

export default function SinglePicker() {
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0)

  useShareAppMessage(() => ({
    title: 'SinglePicker',
    path: pageUrls.SinglePickerIndex,
  }))

  return (
    <View>
      <XNavigationBar>SinglePicker</XNavigationBar>
      <XTitle>单项选择</XTitle>
      <XList>
        <MSinglePicker
          title='选个国家'
          selectedIndex={selectedCountryIndex}
          data={countryData}
          onConfirm={selectedCountryIndex => setSelectedCountryIndex(selectedCountryIndex)}>
          <XItem
            title='选个国家'
            extra={countryData[selectedCountryIndex].label}
            arrow={true}
            feedback={true}
          />
        </MSinglePicker>
      </XList>
    </View>
  )
}
