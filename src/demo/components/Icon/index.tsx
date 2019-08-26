import './index.scss'
import Taro from '@tarojs/taro'
import {createProps, functionalComponent, RequiredProp} from '../../../components/component'
import {View} from '@tarojs/components'

const XIconDefaultProps = createProps({
  name: '' as any as RequiredProp<'rightArrow' | 'home'>,
})

export type XIconProps = typeof XIconDefaultProps

function XIcon(props: XIconProps) {
  return (
    <View className={`iconfont icon-${props.name}`} />
  )
}

export default functionalComponent(XIconDefaultProps, true)(XIcon)
