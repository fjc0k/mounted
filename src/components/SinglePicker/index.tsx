import MPicker from '../Picker'
import Taro from '@tarojs/taro'
import { component } from '../component'
import { NormalData, NormalItem } from '../PickerView'
import { SinglePickerProps } from './props'

export type Item = NormalItem
export type Data = Item[]

/**
 * 单项选择器组件。
 */
class MSinglePicker extends component({
  props: SinglePickerProps,
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

  handleConfirm: MPicker['props']['onConfirm'] = selectedIndexes => {
    this.props.onConfirm(selectedIndexes[0])
  }

  render() {
    const {
      localData,
      localSelectedIndexes,
    } = this.state

    return (
      <MPicker
        {...this.props}
        data={localData}
        selectedIndexes={localSelectedIndexes}
        onConfirm={this.handleConfirm}>
        {this.props.children}
      </MPicker>
    )
  }
}

export default MSinglePicker
