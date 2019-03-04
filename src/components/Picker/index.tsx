import { View } from '@tarojs/components'
import { component } from '../component'
import MPickerView, { Data } from '../PickerView'
import MPopup from '../Popup'
import _ from './index.module.scss'
import defaultProps from './defaultProps'

class MPicker<D extends Data, V extends (D extends Data<infer VV> ? VV : any) = any> extends component({
  props: defaultProps,
  state: {
    localVisible: false as boolean,
    localValue: [],
  },
})<{
  data: D,
  value?: V[],
  onConfirm?: (value: V[]) => void,
}, {
  localValue: V[],
}> {
  canClose: boolean = true

  componentWillMount() {
    const { value } = this.props
    this.setState({
      localValue: value,
    })
  }

  componentWillReceiveProps({ value }: MPicker<D>['props']) {
    this.setState({
      localValue: value,
    })
  }

  handleTriggerClick = () => {
    this.setState(prevState => ({
      localVisible: !prevState.localVisible,
    }))
  }

  handleVisibleChange: MPopup['props']['onVisibleChange'] = visible => {
    this.setState({
      localVisible: visible,
      ...(visible ? {} as any : { localValue: this.props.value }),
    })
  }

  handlePickStart = () => {
    this.canClose = false
  }

  handlePickEnd = () => {
    this.canClose = true
  }

  handlePickChange: MPickerView<D>['props']['onChange'] = value => {
    this.setState({
      localValue: value,
    })
  }

  handleCancelClick = () => {
    if (!this.canClose) return
    this.setState({
      localValue: this.props.value,
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
      this.props.onConfirm(this.state.localValue)
    })
  }

  render() {
    const { maskClosable, data, itemHeight, visibleItemCount, noCancel, cancelText, confirmText, title } = this.props
    const { localVisible, localValue } = this.state
    return (
      <View className={_.picker}>
        <View className={_.trigger} onClick={this.handleTriggerClick}>
          {this.props.children}
        </View>
        <MPopup
          position='bottom'
          visible={localVisible}
          maskClosable={maskClosable}
          onVisibleChange={this.handleVisibleChange}>
          <View className={_.view}>
            <View className={_.header}>
              <View className={`${_.cancel} ${noCancel && _.hidden}`} onClick={this.handleCancelClick}>
                {cancelText}
              </View>
              <View className={_.title}>
                {title}
              </View>
              <View className={_.confirm} onClick={this.handleConfirmClick}>
                {confirmText}
              </View>
            </View>
            <MPickerView
              data={data}
              value={localValue as any}
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
