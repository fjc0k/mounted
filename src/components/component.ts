import Taro from '@tarojs/taro'
import { Merge, Omit } from 'vtils'

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type RequiredProp<T = any> = {
  __REQUIRED__: true,
  __TYPE__: T,
}

const functionalComponent = <P extends Record<string, any>>(props: P, disableGlobalClass = false) => (
  <T extends Taro.FunctionComponent<P>>(component: T): T => {
    (component as any).defaultProps = props
    if (!disableGlobalClass) {
      (component as any).options = {
        addGlobalClass: true,
        styleIsolation: 'shared',
      }
    }
    return component
  }
)

const createProps = <
  P extends Record<string, any>,
  PP = (
    Merge<
    PartialBy<
    { [K in keyof P]: P[K] extends RequiredProp<infer T> ? T : P[K] },
    { [K in keyof P]: P[K] extends RequiredProp ? never : K }[keyof P]
    >,
    {
      /** 应用级别、页面级别的类 */
      className?: string,
      /** 子节点 */
      children?: any,
    }
    >
  ),
>(props: P): PP => {
  return props as any
}

export {
  RequiredProp,
  createProps,
  functionalComponent,
}
