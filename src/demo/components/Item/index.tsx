import './index.scss'
import Taro from '@tarojs/taro'
import XIcon from '../Icon'
import {createProps, functionalComponent} from '../../../components/component'
import {noop} from 'vtils'
import {Text, View} from '@tarojs/components'

const XItemDefaultProps = createProps({
  title: '' as string,
  extra: '' as string,
  arrow: false as boolean,
  feedback: false as boolean,
  renderExtra: null as React.ReactNode,
  onClick: noop as () => void,
})

export type XItemProps = typeof XItemDefaultProps

function XItem(props: XItemProps) {
  return (
    <View
      className='item'
      hoverClass={props.feedback ? 'active' : 'none'}
      onClick={props.onClick}>
      <View className='title'>
        {
          props.title === ''
            ? props.children
            : props.title
        }
      </View>
      <View className='extra'>
        {props.extra && <Text>{props.extra}</Text>}
        {props.renderExtra}
      </View>
      {props.arrow && (
        <View className='arrow'>
          <XIcon name='rightArrow' />
        </View>
      )}
    </View>
  )
}

export default functionalComponent(XItemDefaultProps, true)(XItem)
