import './Item.scss'
import Taro from '@tarojs/taro'
import XIcon from './Icon'
import { component } from '../../components/component'
import { noop } from 'vtils'
import { Text, View } from '@tarojs/components'

export default class XItem extends component({
  disableGlobalClass: true,
  props: {
    title: '' as string,
    extra: '' as string,
    arrow: false as boolean,
    feedback: false as boolean,
    renderExtra: null as React.ReactNode,
    onClick: noop as () => void,
  },
}) {
  render() {
    const { title, extra, arrow, feedback } = this.props
    return (
      <View
        className='item'
        hoverClass={feedback ? 'active' : 'none'}
        onClick={this.props.onClick}>
        <View className='title'>
          {
            title === ''
              ? this.props.children
              : <Text>{title}</Text>
          }
        </View>
        <View className='extra'>
          {extra && <Text>{extra}</Text>}
          {this.props.renderExtra}
        </View>
        {arrow && (
          <View className='arrow'>
            <XIcon name='rightArrow' />
          </View>
        )}
      </View>
    )
  }
}
