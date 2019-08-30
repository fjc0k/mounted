import {createProps, RequiredProp} from '../component'
import {MPopupDefaultProps} from '../Popup/props'
import {partial, pick} from 'vtils'

export const MBottomSheetDefaultProps = {
  ...partial(pick(
    MPopupDefaultProps,
    ['visible', 'onVisibleChange'],
  )),
  ...createProps({
    /**
     * 主体内容。
     */
    renderMain: null as any as RequiredProp<React.ReactNode>,

    /**
     * 是否可点击遮罩关闭。
     *
     * @default true
     */
    maskClosable: true as boolean,

    /**
     * 是否禁用。
     *
     * @default false
     */
    disabled: false as boolean,
  }),
}

export type MBottomSheetProps = typeof MBottomSheetDefaultProps
