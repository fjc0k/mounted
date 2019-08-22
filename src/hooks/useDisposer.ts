import { Disposer, DisposerItem } from 'vtils'
import { useDispose } from './useDispose'
import { useState } from '@tarojs/taro'

/**
 * `vtils.Disposer` 的 hook 版本。
 */
export function useDisposer() {
  const [disposer] = useState(() => new Disposer())
  useDispose(() => disposer.dispose())
  return {
    addDisposer(items: DisposerItem | DisposerItem[]) {
      disposer.add(items)
    },
  }
}
