import {useEffect, useRef} from '@tarojs/taro'

export function usePrevious<T>(value: T, initialValue?: T): T {
  const ref = useRef<T>(initialValue)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
