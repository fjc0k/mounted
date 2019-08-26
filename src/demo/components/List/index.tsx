import './index.scss'
import Taro from '@tarojs/taro'
import {createProps, functionalComponent} from '../../../components/component'
import {View} from '@tarojs/components'

const XListDefaultProps = createProps({})

export type XListProps = typeof XListDefaultProps

function XList(props: XListProps) {
  return (
    <View className='list'>
      <View className='content'>
        {props.children}
      </View>
    </View>
  )
}

export default functionalComponent(XListDefaultProps, true)(XList)
