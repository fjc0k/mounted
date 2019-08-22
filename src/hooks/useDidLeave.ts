import { useDidHide } from '@tarojs/taro'
import { useEffectOnce } from './useEffectOnce'

/**
 * 离开页面。
 *
 * @param callback 回调函数
 */
export function useDidLeave(callback: () => any) {
  useDidHide(callback)
  useEffectOnce(() => callback)
}
