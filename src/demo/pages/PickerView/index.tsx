import Taro, {useShareAppMessage, useState} from '@tarojs/taro'
import {Input, Switch, View} from '@tarojs/components'
import {MCascadedPickerViewProps, MNormalPickerViewProps, MPickerView, MPickerViewCascadedData, MPickerViewNormalData, MPickerViewNormalItem} from '../../../components'
import {pageUrls} from '..'
import {XItem, XList, XNavigationBar, XTitle} from '../../components'

const shooterList: string[] = ['鲁班七号', '孙尚香', '虞姬', '马可波罗', '狄仁杰']
const mageList: string[] = ['墨子', '武则天', '安琪拉', '妲己', '张良', '上官婉儿']

const shooterData: MPickerViewNormalData = [
  shooterList.map<MPickerViewNormalItem>(
    name => ({label: name}),
  ),
]

const shooterAndMageData: MPickerViewNormalData = [
  ...shooterData,
  mageList.map<MPickerViewNormalItem>(
    name => ({label: name}),
  ),
]

const heroData: MPickerViewCascadedData = [
  {
    label: '射手',
    children: shooterData[0],
  },
  {
    label: '法师',
    children: shooterAndMageData[1],
  },
]

export default function PickerView() {
  const [normalPickerProps, setNormalPickerProps] = useState<Partial<MNormalPickerViewProps>>(() => ({
    data: shooterAndMageData,
    selectedIndexes: [0, 0],
    visibleItemCount: 5,
    disabled: false,
    separator: '和',
  }))
  const [cascadedPickerProps, setCascadedPickerProps] = useState<Partial<MCascadedPickerViewProps>>(() => ({
    data: heroData,
    selectedIndexes: [0, 0],
    visibleItemCount: 5,
    disabled: false,
    separator: ':',
  }))

  useShareAppMessage(() => ({
    title: 'PickerView',
    path: pageUrls.PickerViewIndex,
  }))

  return (
    <View>
      <XNavigationBar>PickerView</XNavigationBar>
      <XTitle>普通选择</XTitle>
      <XList>
        <XItem
          title='选中项索引'
          extra={JSON.stringify(normalPickerProps.selectedIndexes)}
        />
        <XItem
          title='选中项标签'
          extra={
            JSON.stringify(
              normalPickerProps.data.map(
                (list, index) => list[normalPickerProps.selectedIndexes[index]].label,
              ),
            )
          }
        />
        <XItem
          title='可见条目数量'
          renderExtra={(
            <Input
              value={String(normalPickerProps.visibleItemCount)}
              type='number'
              placeholder='输入数字'
              style={{textAlign: 'right'}}
              onInput={e => {
                setNormalPickerProps({
                  ...normalPickerProps,
                  visibleItemCount: Number(e.detail.value),
                })
              }}
            />
          )}
        />
        <XItem
          title='分隔符'
          renderExtra={(
            <Input
              value={normalPickerProps.separator as string}
              placeholder='输入分隔符'
              style={{textAlign: 'right'}}
              onInput={e => {
                setNormalPickerProps({
                  ...normalPickerProps,
                  separator: e.detail.value,
                })
              }}
            />
          )}
        />
        <XItem
          title='是否禁用'
          renderExtra={(
            <Switch
              checked={normalPickerProps.disabled}
              onChange={e => {
                setNormalPickerProps({
                  ...normalPickerProps,
                  disabled: e.detail.value,
                })
              }}
            />
          )}
        />
        <XItem>
          <MPickerView
            data={normalPickerProps.data}
            selectedIndexes={normalPickerProps.selectedIndexes}
            visibleItemCount={normalPickerProps.visibleItemCount}
            disabled={normalPickerProps.disabled}
            separator={normalPickerProps.separator}
            onChange={selectedIndexes => {
              setNormalPickerProps({
                ...normalPickerProps,
                selectedIndexes: selectedIndexes,
              })
            }}
          />
        </XItem>
      </XList>
      <XTitle>级联选择</XTitle>
      <XList>
        <XItem
          title='选中项索引'
          extra={JSON.stringify(cascadedPickerProps.selectedIndexes)}
        />
        <XItem
          title='选中项标签'
          extra={
            JSON.stringify([
              cascadedPickerProps.data[cascadedPickerProps.selectedIndexes[0]].label,
              cascadedPickerProps.data[cascadedPickerProps.selectedIndexes[0]].children[cascadedPickerProps.selectedIndexes[1]].label,
            ])
          }
        />
        <XItem
          title='可见条目数量'
          renderExtra={(
            <Input
              value={String(cascadedPickerProps.visibleItemCount)}
              type='number'
              placeholder='输入数字'
              style={{textAlign: 'right'}}
              onInput={e => {
                setCascadedPickerProps({
                  ...cascadedPickerProps,
                  visibleItemCount: Number(e.detail.value),
                })
              }}
            />
          )}
        />
        <XItem
          title='分隔符'
          renderExtra={(
            <Input
              value={cascadedPickerProps.separator as string}
              placeholder='输入分隔符'
              style={{textAlign: 'right'}}
              onInput={e => {
                setCascadedPickerProps({
                  ...cascadedPickerProps,
                  separator: e.detail.value,
                })
              }}
            />
          )}
        />
        <XItem
          title='是否禁用'
          renderExtra={(
            <Switch
              checked={cascadedPickerProps.disabled}
              onChange={e => {
                setCascadedPickerProps({
                  ...cascadedPickerProps,
                  disabled: e.detail.value,
                })
              }}
            />
          )}
        />
        <XItem>
          <MPickerView
            data={cascadedPickerProps.data}
            selectedIndexes={cascadedPickerProps.selectedIndexes}
            visibleItemCount={cascadedPickerProps.visibleItemCount}
            disabled={cascadedPickerProps.disabled}
            separator={cascadedPickerProps.separator}
            onChange={selectedIndexes => {
              setCascadedPickerProps({
                ...cascadedPickerProps,
                selectedIndexes: selectedIndexes,
              })
            }}
          />
        </XItem>
      </XList>
    </View>
  )
}
