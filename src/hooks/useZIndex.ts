import {useState} from '@tarojs/taro'

let zIndex = 5000

/**
 * 获取一个全局唯一的 `zIndex` 值。
 */
export function useZIndex() {
  const zIndexValue = useState(() => zIndex++)
  return {zIndex: zIndexValue}
}
