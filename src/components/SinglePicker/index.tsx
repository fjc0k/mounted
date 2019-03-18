import { component } from '../component'
import { NormalColData } from '../PickerView'
import MPicker from '../Picker'
import defaultProps from './defaultProps'

class MSinglePicker<D extends NormalColData, V extends (D extends NormalColData<infer VV> ? VV : any) = any> extends component({
  props: defaultProps,
  state: {
    localData: [],
    localValue: [],
  },
})<{
  data: D,
  value?: V,
  onConfirm?: (value: V) => void,
}, {
  localData: [D],
  localValue: [V],
}> {
  componentWillMount() {
    const { data, value } = this.props
    this.setState({
      localData: [data],
      localValue: [value],
    })
  }

  componentWillReceiveProps({ data, value }: MSinglePicker<D>['props']) {
    this.setState({
      localData: [data],
      localValue: [value],
    })
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  handleConfirm: MPicker<D[]>['props']['onConfirm'] = value => {
    this.props.onConfirm(value[0])
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
      localValue,
    } = this.state
    return (
      <MPicker
        maskClosable={maskClosable}
        data={localData}
        value={localValue as any}
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
