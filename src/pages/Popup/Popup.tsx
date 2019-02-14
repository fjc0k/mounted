import './Popup.scss'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { range } from 'vtils'
import { MPopup, MSticky } from '../../components'
import { component } from '../../components/component'

export default class Popup extends component({
  state: {
    visible: false as boolean,
  },
}) {
  toggleVisible = () => {
    this.setState(_ => ({
      visible: !_.visible,
    }))
  }

  render() {
    const { visible } = this.state
    return (
      <View>
        {range(0, 20).map(index => (
          <View key={index}>{index}</View>
        ))}
        <MPopup position='center' visible={visible} onVisibleChange={this.toggleVisible}>
          <View className='content'>
            hello
          </View>
        </MPopup>
        <MSticky>
          <Button onClick={this.toggleVisible}>set visible = {!visible}</Button>
        </MSticky>
        {range(0, 100).map(index => (
          <View key={index}>{index}</View>
        ))}
      </View>
    )
  }
}
