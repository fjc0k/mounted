import {useEffectOnce} from './useEffectOnce'

/**
 * 在组件销毁时触发回调。
 *
 * @param callback 回调
 */
export function useDispose(callback: () => any) {
  useEffectOnce(() => callback)
}
