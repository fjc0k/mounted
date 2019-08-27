import './index.scss'
import Taro, {useShareAppMessage, useState} from '@tarojs/taro'
import {MTransition, MTransitionProps} from '../../../components'
import {pageUrls} from '..'
import {useCustomNavigationBarFullHeight} from '../../../hooks'
import {View} from '@tarojs/components'
import {XNavigationBar} from '../../components'

type TransitionName = MTransitionProps['name']

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

export default function Transition() {
  const [transitionName, setTransitionName] = useState<TransitionName>('fade')
  const [visible, setVisible] = useState<boolean>(true)
  const {customNavigationBarFullHeight} = useCustomNavigationBarFullHeight()

  useShareAppMessage(() => ({
    title: 'Transition',
    path: pageUrls.TransitionIndex,
  }))

  const handleToggleClick = (transitionName: TransitionName) => {
    setTransitionName(transitionName)
    setVisible(!visible)
  }

  return (
    <View className='page'>
      <XNavigationBar>Transition</XNavigationBar>
      <View
        className='sideBar'
        style={{top: `${customNavigationBarFullHeight}px`}}>
        {transitionNameList.map(name => (
          <View
            key={name}
            className='toggle'
            hoverClass='active'
            hoverStayTime={100}
            onClick={() => handleToggleClick(name)}>
            {name}
          </View>
        ))}
      </View>
      <MTransition
        name={transitionName}
        duration={1000}
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
