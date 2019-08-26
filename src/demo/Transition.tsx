import './Transition.scss'
import Taro, { ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { internalStore } from '../components/internal'
import { MTransition } from '../components'
import { pageUrls } from '.'
import { View } from '@tarojs/components'
import { XBackHome, XNavigationBar } from './components'

type TransitionName = MTransition['props']['name']

const poem: string[] = [
  '一种风，',
  '只流浪在一座山谷；',
  '一道堤，',
  '只护住一湾星河。',
  '每次仰望星空，',
  '我总是闭上眼。',
  '因为，',
  '最美的一颗不在天上。',
]

const transitionNameList: TransitionName[] = [
  'fade',
  'fadeDown',
  'fadeLeft',
  'fadeRight',
  'fadeUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'slideUp',
  'zoom',
  'drop',
]

export default class Transition extends component({
  disableGlobalClass: true,
  state: {
    transitionName: 'fade' as TransitionName,
    visible: true as boolean,
  },
}) {
  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'Transition',
      path: pageUrls.Transition,
    }
  }

  handleToggleClick = (transitionName: TransitionName) => {
    this.setState(_ => ({
      transitionName: transitionName,
      visible: !_.visible,
    }))
  }

  render() {
    const { transitionName, visible } = this.state
    return (
      <View className='page'>
        <XNavigationBar>Transition{internalStore.customNavigationBarFullHeight}</XNavigationBar>
        <View className='sideBar' style={{ top: `${internalStore.customNavigationBarFullHeight}px` }}>
          {transitionNameList.map(name => (
            <View
              key={name}
              className='toggle'
              hoverClass='active'
              hoverStayTime={100}
              onClick={this.handleToggleClick.bind(this, name)}>
              {name}
            </View>
          ))}
        </View>
        <MTransition
          name={transitionName}
          visible={visible}>
          <View className='poem'>
            {poem.map(sentence => (
              <View key={sentence}>
                {sentence}
              </View>
            ))}
          </View>
        </MTransition>
        <XBackHome />
      </View>
    )
  }
}
