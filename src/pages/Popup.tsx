import './Popup.scss'
import Taro, { ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { MPopup } from '../components'
import { pageUrls } from '.'
import { View } from '@tarojs/components'
import { XBackHome, XNavigationBar } from './components'

type PopupPosition = typeof MPopup

const positionList: PopupPosition[] = [
  'bottom',
  'center',
  'left',
  'right',
  'top',
]

export default class Popup extends component({
  disableGlobalClass: true,
  state: {
    position: 'top' as PopupPosition,
    visible: false as boolean,
  },
}) {
  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'Popup',
      path: pageUrls.Popup,
    }
  }

  handleToggleClick = (position: PopupPosition) => {
    this.setState(_ => ({
      position: position,
      visible: !_.visible,
    }))
  }

  render() {
    const { visible, position } = this.state
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
              onClick={this.handleToggleClick.bind(this, pos)}>
              {pos}
            </View>
          ))}
        </View>
        <MPopup
          visible={visible}
          position={position}
          onVisibleChange={visible => this.setState({ visible })}>
          <View className={`popup ${position}`}>
            {position.toUpperCase()}
          </View>
        </MPopup>
        <XBackHome />
      </View>
    )
  }
}
