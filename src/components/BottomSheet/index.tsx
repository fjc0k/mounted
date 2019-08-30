import MPopup, {MPopupProps} from '../Popup'
import Taro, {useEffect, useState} from '@tarojs/taro'
import {functionalComponent} from '../component'
import {MBottomSheetDefaultProps, MBottomSheetProps} from './props'
import {View} from '@tarojs/components'

function MBottomSheet(props: MBottomSheetProps) {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(
    () => {
      setVisible(props.visible)
    },
    [props.visible],
  )

  const handleVisibleChange: MPopupProps['onVisibleChange'] = visible => {
    setVisible(visible)
    props.onVisibleChange(visible)
  }

  function handleTriggerClick() {
    handleVisibleChange(!visible)
  }

  return props.disabled ? props.children : (
    <View className={props.className}>
      <View onClick={handleTriggerClick}>
        {props.children}
      </View>
      <MPopup
        position='bottom'
        visible={visible}
        maskClosable={props.maskClosable}
        onVisibleChange={handleVisibleChange}>
        {props.renderMain}
      </MPopup>
    </View>
  )
}

export {MBottomSheetProps}

export default functionalComponent(MBottomSheetDefaultProps)(MBottomSheet)
