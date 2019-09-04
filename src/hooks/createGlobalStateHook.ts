import {EventBus} from 'vtils'
import {useEffect, useMemo, useState} from '@tarojs/taro'

let stateIndex: number = 0

const store = new Map<number, any>()

const bus = new EventBus<{
  setState: (index: number, value: any) => void,
}>()

bus.on('setState', (index, value) => {
  store.set(index, value)
})

export function createGlobalStateHook<V>() {
  const index = stateIndex++

  return function useGlobalState(initialValue?: V): [V, (value: V) => void] {
    const [value, setValue] = useState<V>(
      () => {
        if (initialValue != null && !store.has(index)) {
          store.set(index, initialValue)
        }
        return store.get(index)
      },
    )

    const off = useMemo(() => {
      return bus.on(
        'setState',
        (targetIndex, targetValue) => {
          if (targetIndex === index) {
            setValue(targetValue)
          }
        },
      )
    }, [])

    useEffect(() => off, [])

    return [
      value,
      function setValue(value: V) {
        bus.emit('setState', index, value)
      },
    ]
  }
}
