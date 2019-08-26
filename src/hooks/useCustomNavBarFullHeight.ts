import {EventBus} from 'vtils'
import {useDispose} from './useDispose'
import {useState} from '@tarojs/taro'

let customNavigationBarFullHeight = 0

const bus = new EventBus<{
  setCustomNavigationBarFullHeight: (height: number) => void,
}>()

bus.on('setCustomNavigationBarFullHeight', height => {
  customNavigationBarFullHeight = height
})

export function useCustomNavigationBarFullHeight() {
  const [height, setHeight] = useState(customNavigationBarFullHeight)
  useDispose(
    bus.on(
      'setCustomNavigationBarFullHeight',
      height => setHeight(height),
    ),
  )
  return {
    customNavigationBarFullHeight: height,
    setCustomNavigationBarFullHeight(height: number) {
      bus.emit('setCustomNavigationBarFullHeight', height)
    },
    resetCustomNavigationBarFullHeight() {
      bus.emit('setCustomNavigationBarFullHeight', 0)
    },
  }
}
