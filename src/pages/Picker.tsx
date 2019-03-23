import Taro, { Config } from '@tarojs/taro'
import { component } from '../components/component'
import { Data, Item } from '../components/PickerView'
import { MPicker } from '../components'
import { View } from '@tarojs/components'
import { XItem, XList, XTitle } from './components'

const shooterList: string[] = ['鲁班七号', '孙尚香', '虞姬', '马可波罗', '狄仁杰']
const mageList: string[] = ['墨子', '武则天', '安琪拉', '妲己', '张良', '上官婉儿']

const shooterData: Data<string> = [
  shooterList.map<Item<string>>(
    name => ({
      label: name,
      value: name,
    }),
  ),
]

const shooterAndMageData: Data<string> = [
  ...shooterData,
  mageList.map<Item<string>>(
    name => ({
      label: name,
      value: name,
    }),
  ),
]

const heroData: Data<string> = [
  {
    label: '射手',
    value: '射手',
    children: shooterData[0],
  },
  {
    label: '法师',
    value: '法师',
    children: shooterAndMageData[1],
  },
]

export default class Picker extends component({
  disableGlobalClass: true,
  state: {
    selectedShooter: [shooterList[0]],
    selectedShooterAndMage: [shooterList[0], mageList[0]],
    selectedHero: [heroData[0].value, heroData[0].children[0].value],
  },
}) {
  config: Config = {
    navigationBarTitleText: 'Picker',
  }

  render() {
    const { selectedShooter, selectedShooterAndMage, selectedHero } = this.state
    return (
      <View>
        <XTitle>普通选择</XTitle>
        <XList>
          <MPicker
            title='选个射手'
            value={selectedShooter}
            data={shooterData}
            onConfirm={selectedShooter => this.setState({ selectedShooter })}>
            <XItem
              title='选个射手'
              extra={selectedShooter[0]}
              arrow={true}
              feedback={true}
            />
          </MPicker>
          <MPicker
            title='选个射手&法师'
            value={selectedShooterAndMage}
            data={shooterAndMageData}
            onConfirm={selectedShooterAndMage => this.setState({ selectedShooterAndMage })}>
            <XItem
              title='选个射手&法师'
              extra={selectedShooterAndMage.join(', ')}
              arrow={true}
              feedback={true}
            />
          </MPicker>
        </XList>
        <XTitle>级联选择</XTitle>
        <XList>
          <MPicker
            title='选个英雄'
            value={selectedHero}
            data={heroData}
            onConfirm={selectedHero => this.setState({ selectedHero })}>
            <XItem
              title='选个英雄'
              extra={selectedHero.join(' - ')}
              arrow={true}
              feedback={true}
            />
          </MPicker>
        </XList>
      </View>
    )
  }
}
