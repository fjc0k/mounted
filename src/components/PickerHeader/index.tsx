import Taro from '@tarojs/taro'
import {functionalComponent} from '../component'
import {MPickerHeaderDefaultProps, MPickerHeaderProps} from './props'
import {usePlatform} from '../../hooks'
import {View} from '@tarojs/components'

function MPickerHeader(props: MPickerHeaderProps) {
  const platform = usePlatform()

  return (
    <View className={`m-picker-header is-${platform}`}>
      <View
        className={`m-picker-header__cancel ${props.noCancel && 'm-picker-header__cancel_hidden'}`}
        hoverClass='m-picker-header__cancel_active'
        onClick={props.onCancel}>
        {props.cancelText}
      </View>
      <View className='m-picker-header__title'>
        {props.title}
        {props.renderTitle}
      </View>
      <View
        className='m-picker-header__confirm'
        hoverClass='m-picker-header__confirm_active'
        onClick={props.onConfirm}>
        {props.confirmText}
      </View>
    </View>
  )
}

export {MPickerHeaderProps}

export default functionalComponent(MPickerHeaderDefaultProps)(MPickerHeader)
