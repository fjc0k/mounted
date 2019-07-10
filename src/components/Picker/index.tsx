import MPickerView from '../PickerView'
import MPopup from '../Popup'
import Taro from '@tarojs/taro'
import { component } from '../component'
import { MPickerProps } from './props'
import { View } from '@tarojs/components'

/**
 * 选择器组件。
 */
class MPicker extends component({
  props: MPickerProps,
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
    const {
      maskClosable,
      noCancel,
      cancelText,
      confirmText,
      title,
      disabled,
      className,
      // ...props // TODO: 尚不可用
    } = this.props

    const {
      localVisible,
      localSelectedIndexes,
    } = this.state

    return disabled ? this.props.children : (
      <View className={className}>
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
              {...this.props}
              selectedIndexes={localSelectedIndexes}
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
