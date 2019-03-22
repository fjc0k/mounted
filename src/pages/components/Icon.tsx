import './Icon.scss'
import Taro from '@tarojs/taro'
import { component, RequiredProp } from '../../components/component'
import { View } from '@tarojs/components'

export default class XIcon extends component({
  disableGlobalClass: true,
  props: {
    name: '' as any as RequiredProp<'rightArrow'>,
  },
}) {
  render() {
    const { name } = this.props
    return (
      <View className={`iconfont icon-${name}`} />
    )
  }
}
