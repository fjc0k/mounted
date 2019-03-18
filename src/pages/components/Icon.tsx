import './Icon.scss'
import { View } from '@tarojs/components'
import { component, RequiredProp } from '../../components/component'

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
