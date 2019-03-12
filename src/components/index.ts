/** 导出辅助内容 */
export { component, RequiredProp } from './component'

/** 导出组件 */
// @index('./[A-Z]*', f => `export { default as M${f.name} } from '${f.path}'`)
export { default as MFormIdCollector } from './FormIdCollector'
export { default as MPicker } from './Picker'
export { default as MPickerView } from './PickerView'
export { default as MPopup } from './Popup'
export { default as MSinglePicker } from './SinglePicker'
export { default as MSticky } from './Sticky'
export { default as MTransition } from './Transition'
// @endindex
