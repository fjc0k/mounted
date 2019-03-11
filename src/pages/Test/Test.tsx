import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Self from './Test'

export default class Test extends Component<{ n: number }> {
  render() {
    const { n } = this.props
    return (
      <View>
        {
          n === 1
            ? <Self n={0} />
            : 'over'
        }
      </View>
    )
  }
}
