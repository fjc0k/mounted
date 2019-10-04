import Taro from '@tarojs/taro'

const platform: 'ios' | 'android' = (
  Taro.getSystemInfoSync().platform.toLowerCase() === 'ios'
    ? 'ios'
    : 'android'
)

export function usePlatform() {
  return platform
}
