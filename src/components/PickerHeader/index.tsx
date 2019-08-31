import Taro from '@tarojs/taro'
import {functionalComponent} from '../component'
import {MPickerHeaderDefaultProps, MPickerHeaderProps} from './props'
import {View} from '@tarojs/components'

function MPickerHeader(props: MPickerHeaderProps) {
  return (
    <View className='m-picker-header'>
      <View
        className={`m-picker-header__cancel ${props.noCancel && 'm-picker-header__cancel_hidden'}`}
        onClick={props.onCancel}>
        {props.cancelText}
      </View>
      <View className='m-picker-header__title'>
        {props.title}
        {props.renderTitle}
      </View>
      <View
        className='m-picker-header__confirm'
        onClick={props.onConfirm}>
        {props.confirmText}
      </View>
    </View>
  )
}

export {MPickerHeaderProps}

export default functionalComponent(MPickerHeaderDefaultProps)(MPickerHeader)
