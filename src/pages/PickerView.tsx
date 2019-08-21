import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { CascadedData, NormalData, NormalItem } from '../components/PickerView'
import { component } from '../components/component'
import { Input, Switch, View } from '@tarojs/components'
import { MPickerView } from '../components'
import { pageUrls } from '.'
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

export default class PickerView extends component({
  disableGlobalClass: true,
  state: {
    normal: {
      data: shooterAndMageData,
      selectedIndexes: [0, 0],
      visibleItemCount: 5,
      disabled: false,
      separator: '和',
    },
    cascaded: {
      data: heroData,
      selectedIndexes: [0, 0],
      visibleItemCount: 5,
      disabled: false,
      separator: ':',
    },
  },
}) {
  config: Config = {
    navigationBarTitleText: 'PickerView',
  }

  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'PickerView',
      path: pageUrls.PickerView,
    }
  }

  render() {
    const { normal, cascaded } = this.state
    return (
      <View>
        <XTitle>普通选择</XTitle>
        <XList>
          <XItem
            title='选中项索引'
            extra={JSON.stringify(normal.selectedIndexes)}
          />
          <XItem
            title='选中项标签'
            extra={
              JSON.stringify(
                normal.data.map(
                  (list, index) => list[normal.selectedIndexes[index]].label,
                ),
              )
            }
          />
          <XItem
            title='可见条目数量'
            renderExtra={(
              <Input
                value={String(normal.visibleItemCount)}
                type='number'
                placeholder='输入数字'
                style={{ textAlign: 'right' }}
                onInput={e => {
                  this.setState(_ => ({
                    normal: {
                      ..._.normal,
                      visibleItemCount: Number(e.detail.value),
                    },
                  }))
                }}
              />
            )}
          />
          <XItem
            title='分隔符'
            renderExtra={(
              <Input
                value={normal.separator}
                placeholder='输入分隔符'
                style={{ textAlign: 'right' }}
                onInput={e => {
                  this.setState(_ => ({
                    normal: {
                      ..._.normal,
                      separator: e.detail.value,
                    },
                  }))
                }}
              />
            )}
          />
          <XItem
            title='是否禁用'
            renderExtra={(
              <Switch
                checked={normal.disabled}
                onChange={e => {
                  this.setState(_ => ({
                    normal: {
                      ..._.normal,
                      disabled: e.detail.value,
                    },
                  }))
                }}
              />
            )}
          />
          <XItem>
            <MPickerView
              data={normal.data}
              selectedIndexes={normal.selectedIndexes}
              visibleItemCount={normal.visibleItemCount}
              disabled={normal.disabled}
              separator={normal.separator}
              onChange={selectedIndexes => {
                this.setState(_ => ({
                  normal: {
                    ..._.normal,
                    selectedIndexes: selectedIndexes,
                  },
                }))
              }}
            />
          </XItem>
        </XList>
        <XTitle>级联选择</XTitle>
        <XList>
          <XItem
            title='选中项索引'
            extra={JSON.stringify(cascaded.selectedIndexes)}
          />
          <XItem
            title='选中项标签'
            extra={
              JSON.stringify([
                cascaded.data[cascaded.selectedIndexes[0]].label,
                cascaded.data[cascaded.selectedIndexes[0]].children[cascaded.selectedIndexes[1]].label,
              ])
            }
          />
          <XItem
            title='可见条目数量'
            renderExtra={(
              <Input
                value={String(cascaded.visibleItemCount)}
                type='number'
                placeholder='输入数字'
                style={{ textAlign: 'right' }}
                onInput={e => {
                  this.setState(_ => ({
                    cascaded: {
                      ..._.cascaded,
                      visibleItemCount: Number(e.detail.value),
                    },
                  }))
                }}
              />
            )}
          />
          <XItem
            title='分隔符'
            renderExtra={(
              <Input
                value={cascaded.separator}
                placeholder='输入分隔符'
                style={{ textAlign: 'right' }}
                onInput={e => {
                  this.setState(_ => ({
                    cascaded: {
                      ..._.cascaded,
                      separator: e.detail.value,
                    },
                  }))
                }}
              />
            )}
          />
          <XItem
            title='是否禁用'
            renderExtra={(
              <Switch
                checked={cascaded.disabled}
                onChange={e => {
                  this.setState(_ => ({
                    cascaded: {
                      ..._.cascaded,
                      disabled: e.detail.value,
                    },
                  }))
                }}
              />
            )}
          />
          <XItem>
            <MPickerView
              data={cascaded.data}
              selectedIndexes={cascaded.selectedIndexes}
              visibleItemCount={cascaded.visibleItemCount}
              disabled={cascaded.disabled}
              separator={cascaded.separator}
              onChange={selectedIndexes => {
                this.setState(_ => ({
                  cascaded: {
                    ..._.cascaded,
                    selectedIndexes: selectedIndexes,
                  },
                }))
              }}
            />
          </XItem>
        </XList>
        <XBackHome />
      </View>
    )
  }
}
