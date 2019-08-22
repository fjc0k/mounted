import { useEffect } from '@tarojs/taro'

/**
 * 等同于 `useEffect(effect, [])`。
 *
 * @param effect 副作用
 */
export function useEffectOnce(effect: () => any) {
  useEffect(effect, [])
}
