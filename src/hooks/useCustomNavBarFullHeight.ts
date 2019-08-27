import {createGlobalStateHook} from './createGlobalStateHook'

const useGlobalHeight = createGlobalStateHook<number>()

export function useCustomNavigationBarFullHeight() {
  const [height, setHeight] = useGlobalHeight(0)
  return {
    customNavigationBarFullHeight: height,
    setCustomNavigationBarFullHeight(height: number) {
      setHeight(height)
    },
    resetCustomNavigationBarFullHeight() {
      setHeight(0)
    },
  }
}
