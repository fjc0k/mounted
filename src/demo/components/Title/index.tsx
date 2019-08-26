import './index.scss'
import Taro from '@tarojs/taro'
import { createProps, functionalComponent } from '../../../components/component'
import { View } from '@tarojs/components'

const XTitleDefaultProps = createProps({})

export type XTitleProps = typeof XTitleDefaultProps

function XTitle(props: XTitleProps) {
  return (
    <View className='title'>
      {props.children}
    </View>
  )
}

export default functionalComponent(XTitleDefaultProps, true)(XTitle)
