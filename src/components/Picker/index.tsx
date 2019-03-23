import MPickerView, { Data } from '../PickerView'
import MPopup from '../Popup'
import Taro from '@tarojs/taro'
import { component, RequiredProp } from '../component'
import { noop } from 'vtils'
import { View } from '@tarojs/components'

/**
 * 选择器组件。
 */
class MPicker extends component({
  props: {
    /** 选项数据 */
    data: [] as any as RequiredProp<Data>,
    /** 选中条目的索引列表 */
    selectedIndexes: [] as any as RequiredProp<number[]>,
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
    onConfirm: noop as any as RequiredProp<(selectedIndexes: number[]) => void>,
  },
  state: {
    localVisible: false as boolean,
    localSelectedIndexes: [],
  },
}) {
  canClose: boolean = true

  componentWillMount() {
    const { selectedIndexes } = this.props
    this.setState({
      localSelectedIndexes: selectedIndexes,
    })
  }

  componentWillReceiveProps({ selectedIndexes }: MPicker['props']) {
    this.setState({
      localSelectedIndexes: selectedIndexes,
    })
  }

  handleTriggerClick = () => {
    this.setState(_ => ({
      localVisible: !_.localVisible,
    }))
  }

  handleVisibleChange: MPopup['props']['onVisibleChange'] = visible => {
    const { selectedIndexes } = this.props
    this.setState({
      localVisible: visible,
      ...(visible ? {} as any : { localSelectedIndexes: selectedIndexes }),
    })
  }

  handlePickStart = () => {
    this.canClose = false
  }

  handlePickEnd = () => {
    this.canClose = true
  }

  handlePickChange: MPickerView['props']['onChange'] = selectedIndexes => {
    this.setState({
      localSelectedIndexes: selectedIndexes,
    })
  }

  handleCancelClick = () => {
    if (!this.canClose) return
    this.setState({
      localSelectedIndexes: this.props.selectedIndexes,
      localVisible: false,
    }, () => {
      this.props.onCancel()
    })
  }

  handleConfirmClick = () => {
    if (!this.canClose) return
    this.setState({
      localVisible: false,
    }, () => {
      this.props.onConfirm(this.state.localSelectedIndexes.slice())
    })
  }

  render() {
    const { maskClosable, data, itemHeight, visibleItemCount, noCancel, cancelText, confirmText, title } = this.props
    const { localVisible, localSelectedIndexes } = this.state
    return (
      <View>
        <View onClick={this.handleTriggerClick}>
          {this.props.children}
        </View>
        <MPopup
          position='bottom'
          visible={localVisible}
          maskClosable={maskClosable}
          onVisibleChange={this.handleVisibleChange}>
          <View className='m-picker'>
            <View className='m-picker__header'>
              <View
                className={`m-picker__cancel ${noCancel && 'm-picker__cancel_hidden'}`}
                onClick={this.handleCancelClick}>
                {cancelText}
              </View>
              <View className='m-picker__title'>
                {title}
              </View>
              <View
                className='m-picker__confirm'
                onClick={this.handleConfirmClick}>
                {confirmText}
              </View>
            </View>
            <MPickerView
              data={data}
              selectedIndexes={localSelectedIndexes}
              itemHeight={itemHeight}
              visibleItemCount={visibleItemCount}
              onPickStart={this.handlePickStart}
              onPickEnd={this.handlePickEnd}
              onChange={this.handlePickChange}
            />
          </View>
        </MPopup>
      </View>
    )
  }
}

export default MPicker
