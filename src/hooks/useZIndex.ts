import {useEffectOnce} from './useEffectOnce'

let zIndex = 5000

/**
 * 获取一个全局唯一的 `zIndex` 值。
 */
export function useZIndex() {
  let zIndexValue!: number
  useEffectOnce(() => { zIndexValue = zIndex++ })
  return {zIndex: zIndexValue}
}
