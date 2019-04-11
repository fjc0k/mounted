// @index('./[A-Z]*', (pp, cc) => `export { default as M${pp.name} } from '${pp.path}'`)
export { default as MDatePicker } from './DatePicker'
export { default as MFormIdCollector } from './FormIdCollector'
export { default as MPicker } from './Picker'
export { default as MPickerView } from './PickerView'
export { default as MPopup } from './Popup'
export { default as MSinglePicker } from './SinglePicker'
export { default as MSticky } from './Sticky'
export { default as MTimePicker } from './TimePicker'
export { default as MTransition } from './Transition'
// @endindex

export type ComponentName = (
  // @index('./[A-Z]*', (pp, cc, { last }) => `'${pp.name}'${last ? '' : ' |'}`)
  'DatePicker' |
  'FormIdCollector' |
  'Picker' |
  'PickerView' |
  'Popup' |
  'SinglePicker' |
  'Sticky' |
  'TimePicker' |
  'Transition'
  // @endindex
)
