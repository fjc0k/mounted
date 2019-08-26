import {useDidShow} from '@tarojs/taro'

/**
 * 进入页面。
 *
 * @param callback 回调函数
 */
export function useDidEnter(callback: () => any) {
  useDidShow(callback)
}
