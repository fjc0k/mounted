import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { CascadedData, NormalData, NormalItem } from '../components/PickerView'
import { component } from '../components/component'
import { MPicker } from '../components'
import { pageUrls } from '.'
import { View } from '@tarojs/components'
import { XBackHome, XItem, XList, XTitle } from './components'

const shooterList: string[] = ['鲁班七号', '孙尚香', '虞姬', '马可波罗', '狄仁杰']
const mageList: string[] = ['墨子', '武则天', '安琪拉', '妲己', '张良', '上官婉儿']

const shooterData: NormalData = [
  shooterList.map<NormalItem>(
    name => ({ label: name }),
  ),
]

const shooterAndMageData: NormalData = [
  ...shooterData,
  mageList.map<NormalItem>(
    name => ({ label: name }),
  ),
]

const heroData: CascadedData = [
  {
    label: '射手',
    children: shooterData[0],
  },
  {
    label: '法师',
    children: shooterAndMageData[1],
  },
]

export default class Picker extends component({
  disableGlobalClass: true,
  state: {
    selectedShooterIndexes: [0],
    selectedShooterAndMageIndexes: [0, 0],
    selectedHeroIndexes: [0, 0],
  },
}) {
  config: Config = {
    navigationBarTitleText: 'Picker',
  }

  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'Picker',
      path: pageUrls.Picker,
    }
  }

  render() {
    const { selectedShooterIndexes, selectedShooterAndMageIndexes, selectedHeroIndexes } = this.state
    return (
      <View>
        <XTitle>普通选择</XTitle>
        <XList>
          <MPicker
            title='选个射手'
            selectedIndexes={selectedShooterIndexes}
            data={shooterData}
            onConfirm={selectedShooterIndexes => this.setState({ selectedShooterIndexes })}>
            <XItem
              title='选个射手'
              extra={shooterData[0][selectedShooterIndexes[0]].label}
              arrow={true}
              feedback={true}
            />
          </MPicker>
          <MPicker
            title='选个射手&法师'
            selectedIndexes={selectedShooterAndMageIndexes}
            data={shooterAndMageData}
            onConfirm={selectedShooterAndMageIndexes => this.setState({ selectedShooterAndMageIndexes })}>
            <XItem
              title='选个射手&法师'
              extra={
                [
                  shooterAndMageData[0][selectedShooterAndMageIndexes[0]].label,
                  shooterAndMageData[1][selectedShooterAndMageIndexes[1]].label,
                ].join(', ')
              }
              arrow={true}
              feedback={true}
            />
          </MPicker>
        </XList>
        <XTitle>级联选择</XTitle>
        <XList>
          <MPicker
            title='选个英雄'
            selectedIndexes={selectedHeroIndexes}
            data={heroData}
            onConfirm={selectedHeroIndexes => this.setState({ selectedHeroIndexes })}>
            <XItem
              title='选个英雄'
              extra={
                [
                  heroData[selectedHeroIndexes[0]].label,
                  heroData[selectedHeroIndexes[0]].children[selectedHeroIndexes[1]].label,
                ].join(' - ')
              }
              arrow={true}
              feedback={true}
            />
          </MPicker>
        </XList>
        <XBackHome />
      </View>
    )
  }
}
