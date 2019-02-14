/* eslint-disable indent */
import Taro from '@tarojs/taro'
import { CUSTOM_CLASS } from './const'

type StringKeyedObject = { [key: string]: any }
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type RequiredProp<T = any> = {
  __REQUIRED__: true,
  __TYPE__: T,
}
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

const component = <
  P extends StringKeyedObject,
  S extends StringKeyedObject,
  PP = (
    Overwrite<
      PartialBy<
        { [K in keyof P]: P[K] extends RequiredProp<infer T> ? T : P[K] },
        { [K in keyof P]: P[K] extends RequiredProp ? never : K }[keyof P]
      >,
      {
        /** 应用级别、页面级别的类 */
        className?: string,
        /** 组件级别的类 */
        [CUSTOM_CLASS]?: string,
        /** 组件本身的类 */
        nativeClass?: string,
      }
    >
  ),
  SS = S
>(
  {
    props = {} as any,
    state = {} as any,
  }: {
    props?: P,
    state?: S,
  } = {} as any
) => (
  class Component<
    ExtraProps extends StringKeyedObject = {},
    ExtraState extends StringKeyedObject = {}
  > extends Taro.Component<
    Overwrite<PP, ExtraProps>,
    Overwrite<SS, ExtraState>
  > {
    static externalClasses = [CUSTOM_CLASS]

    static options = {
      addGlobalClass: true,
    }

    static defaultProps = props

    constructor() {
      super(...arguments)
      this.props = props as any
      this.state = state as any
    }
  }
)

export {
  RequiredProp,
  component,
}
