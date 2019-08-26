import Taro, { useShareAppMessage, useState } from '@tarojs/taro'
import { MPicker, MPickerCascadedData, MPickerNormalData, MPickerNormalItem } from '../../../components'
import { pageUrls } from '..'
import { View } from '@tarojs/components'
import { XItem, XList, XNavigationBar, XTitle } from '../../components'

const shooterList: string[] = ['鲁班七号', '孙尚香', '虞姬', '马可波罗', '狄仁杰']
const mageList: string[] = ['墨子', '武则天', '安琪拉', '妲己', '张良', '上官婉儿']

const shooterData: MPickerNormalData = [
  shooterList.map<MPickerNormalItem>(
    name => ({ label: name }),
  ),
]

const shooterAndMageData: MPickerNormalData = [
  ...shooterData,
  mageList.map<MPickerNormalItem>(
    name => ({ label: name }),
  ),
]

const heroData: MPickerCascadedData = [
  {
    label: '射手',
    children: shooterData[0],
  },
  {
    label: '法师',
    children: shooterAndMageData[1],
  },
]

export default function Picker() {
  const [selectedShooterIndexes, setSelectedShooterIndexes] = useState(() => [0])
  const [selectedShooterAndMageIndexes, setSelectedShooterAndMageIndexes] = useState(() => [0, 0])
  const [selectedHeroIndexes, setSelectedHeroIndexes] = useState(() => [0, 0])

  useShareAppMessage(() => ({
    title: 'Picker',
    path: pageUrls.PickerIndex,
  }))

  return (
    <View>
      <XNavigationBar>Picker</XNavigationBar>
      <XTitle>普通选择</XTitle>
      <XList>
        <MPicker
          title='选个射手'
          selectedIndexes={selectedShooterIndexes}
          data={shooterData}
          onConfirm={selectedShooterIndexes => setSelectedShooterIndexes(selectedShooterIndexes)}>
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
          onConfirm={selectedShooterAndMageIndexes => setSelectedShooterAndMageIndexes(selectedShooterAndMageIndexes)}>
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
          onConfirm={selectedHeroIndexes => setSelectedHeroIndexes(selectedHeroIndexes)}>
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
    </View>
  )
}
