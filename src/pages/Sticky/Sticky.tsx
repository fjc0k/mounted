import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { range } from 'vtils'
import { MSticky } from '../../components'

export default class Sticky extends Taro.Component {
  render() {
    return (
      <View>
        {range(0, 30).map(index => (
          <View key={index}>
            {index}
          </View>
        ))}
        <MSticky>
          <View style={{ backgroundColor: 'red', height: '60px' }}>Sticky</View>
        </MSticky>
        {range(0, 40).map(index => (
          <View key={index}>
            {index}
          </View>
        ))}
        <MSticky>
          <View style={{ backgroundColor: 'red' }}>Sticky2</View>
        </MSticky>
        {range(0, 40).map(index => (
          <View key={index}>
            {index}
          </View>
        ))}
        <MSticky>
          <View style={{ backgroundColor: 'blue' }}>Sticky3</View>
        </MSticky>
        {range(0, 40).map(index => (
          <View key={index}>
            {index}
          </View>
        ))}
      </View>
    )
  }
}
