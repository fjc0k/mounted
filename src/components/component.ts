import Taro from '@tarojs/taro'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type RequiredProp<T = any> = {
  __REQUIRED__: true,
  __TYPE__: T,
}
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

const component = <
  P extends Record<string, any>,
  S extends Record<string, any>,
  PP = (
    Overwrite<
    PartialBy<
    { [K in keyof P]: P[K] extends RequiredProp<infer T> ? T : P[K] },
    { [K in keyof P]: P[K] extends RequiredProp ? never : K }[keyof P]
    >,
    {
      /** 应用级别、页面级别的类 */
      className?: string,
    }
    >
  ),
  SS = S
>(
  {
    props = {} as any,
    state = {} as any,
    disableGlobalClass = false,
  }: {
    props?: P,
    state?: S,
    disableGlobalClass?: boolean,
  } = {} as any,
) => (
  class Component<
    ExtraProps extends Record<string, any> = {},
    ExtraState extends Record<string, any> = {}
  > extends Taro.PureComponent<
    Overwrite<PP, ExtraProps>,
    Overwrite<SS, ExtraState>
    > {
    static options: wx.ComponentOptions = disableGlobalClass ? {} : {
      addGlobalClass: true,
      styleIsolation: 'shared',
    }

    static defaultProps: P = props

    constructor() {
      super(...arguments)
      if (process.env.TARO_ENV !== 'h5') {
        this.props = props as any
      }
      this.state = state as any
    }
  }
)

export {
  RequiredProp,
  component,
}
