import { EffectCallback, useEffect } from '@tarojs/taro'

/**
 * 等同于 `useEffect(callback, [])`。
 *
 * @param callback 回调
 */
export function useEffectOnce(callback: EffectCallback) {
  useEffect(callback, [])
}
