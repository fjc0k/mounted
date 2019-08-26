import './index.scss'
import Taro, {useShareAppMessage, useState} from '@tarojs/taro'
import {MPopup, MPopupProps} from '../../../components'
import {pageUrls} from '..'
import {View} from '@tarojs/components'
import {XNavigationBar} from '../../components'

const positionList: Array<MPopupProps['position']> = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
]

export default function Popup() {
  const [position, setPosition] = useState<MPopupProps['position']>('top')
  const [visible, setVisible] = useState<boolean>(false)

  useShareAppMessage(() => ({
    title: 'Popup',
    path: pageUrls.PopupIndex,
  }))

  const handleToggleClick = (position: MPopupProps['position']) => {
    setPosition(position)
    setVisible(!visible)
  }

  return (
    <View>
      <XNavigationBar>Popup</XNavigationBar>
      <View className='container'>
        {positionList.map(pos => (
          <View
            key={pos}
            className={`toggle ${pos}`}
            hoverClass='active'
            hoverStayTime={100}
            onClick={() => handleToggleClick(pos)}>
            {pos}
          </View>
        ))}
      </View>
      <MPopup
        visible={visible}
        position={position}
        onVisibleChange={visible => setVisible(visible)}>
        <View className={`popup ${position}`}>
          {position.toUpperCase()}
        </View>
      </MPopup>
    </View>
  )
}
