import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

export default class Home extends Taro.Component {
  goto = (path: string) => {
    Taro.navigateTo({
      url: path,
    })
  }

  render() {
    return (
      <View>
        <View>组件列表</View>
        <Button onClick={this.goto.bind(this, '/pages/Sticky/Sticky')}>Sticky</Button>
      </View>
    )
  }
}
