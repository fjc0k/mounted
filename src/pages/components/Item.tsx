import './Item.scss'
import { View, Text } from '@tarojs/components'
import { noop } from 'vtils'
import { component } from '../../components/component'
import XIcon from './Icon'

export default class XItem extends component({
  disableGlobalClass: true,
  props: {
    title: '' as string,
    extra: '' as string,
    arrow: false as boolean,
    feedback: false as boolean,
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
          <Text>{extra}</Text>
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
