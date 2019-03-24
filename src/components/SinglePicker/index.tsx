import MPicker from '../Picker'
import Taro from '@tarojs/taro'
import { component, RequiredProp } from '../component'
import { noop } from 'vtils'
import { NormalData, NormalItem } from '../PickerView'

export type Item = NormalItem
export type Data = Item[]

/**
 * 单项选择器组件。
 */
class MSinglePicker extends component({
  props: {
    /** 选项数据 */
    data: [] as any as RequiredProp<Data>,
    /** 选中条目的索引 */
    selectedIndex: 0 as any as RequiredProp<number>,
    /** 单个条目高度 */
    itemHeight: '2.5em' as string,
    /** 显示条目数量 */
    visibleItemCount: 5 as number,
    /** 是否禁止选中 */
    disabled: false as boolean,
    /** 是否可点击遮罩关闭 */
    maskClosable: true as boolean,
    /** 标题 */
    title: '' as string,
    /** 是否无取消按钮 */
    noCancel: false as boolean,
    /** 取消文字 */
    cancelText: '取消' as string,
    /** 确定文字 */
    confirmText: '确定' as string,
    /** 点击取消事件 */
    onCancel: noop as () => void,
    /** 点击确定事件 */
    onConfirm: noop as any as RequiredProp<(selectedIndex: number) => void>,
  },
  state: {
    localData: [] as NormalData,
    localSelectedIndexes: [] as number[],
  },
}) {
  componentWillMount() {
    const { data, selectedIndex } = this.props
    this.setState({
      localData: [data],
      localSelectedIndexes: [selectedIndex],
    })
  }

  componentWillReceiveProps({ data, selectedIndex }: MSinglePicker['props']) {
    this.setState({
      localData: [data],
      localSelectedIndexes: [selectedIndex],
    })
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  handleConfirm: MPicker['props']['onConfirm'] = selectedIndexes => {
    this.props.onConfirm(selectedIndexes[0])
  }

  render() {
    const {
      maskClosable,
      itemHeight,
      visibleItemCount,
      noCancel,
      cancelText,
      confirmText,
      title,
    } = this.props
    const {
      localData,
      localSelectedIndexes,
    } = this.state
    return (
      <MPicker
        maskClosable={maskClosable}
        data={localData}
        selectedIndexes={localSelectedIndexes}
        itemHeight={itemHeight}
        visibleItemCount={visibleItemCount}
        noCancel={noCancel}
        cancelText={cancelText}
        confirmText={confirmText}
        title={title}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}>
        {this.props.children}
      </MPicker>
    )
  }
}

export default MSinglePicker
