import Taro from '@tarojs/taro'
import { component } from '../components/component'
import { Data } from '../components/SinglePicker'
import { MSinglePicker } from '../components'
import { View } from '@tarojs/components'
import { XItem, XList, XTitle } from './components'

const countryData: Data = [
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

export default class SinglePicker extends component({
  disableGlobalClass: true,
  state: {
    selectedCountryIndex: 0,
  },
}) {
  render() {
    const { selectedCountryIndex } = this.state
    return (
      <View>
        <XTitle>单项选择</XTitle>
        <XList>
          <MSinglePicker
            title='选个国家'
            selectedIndex={selectedCountryIndex}
            data={countryData as any}
            onConfirm={selectedCountryIndex => this.setState({ selectedCountryIndex })}>
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
}
