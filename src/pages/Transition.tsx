import './Transition.scss'
import { View } from '@tarojs/components'
import { Config } from '@tarojs/taro'
import { component } from '../components/component'
import { MTransition } from '../components'

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
  config: Config = {
    navigationBarTitleText: 'Transition',
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
        <View className='sideBar'>
          {transitionNameList.map(transitionName => (
            <View
              key={transitionName}
              className='toggle'
              hoverClass='active'
              hoverStayTime={100}
              onClick={this.handleToggleClick.bind(this, transitionName)}>
              {transitionName}
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
      </View>
    )
  }
}
