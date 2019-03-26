// @index(['./[A-Z]*', '!./Style'], (pp, cc) => `export { default as M${pp.name} } from '${pp.path}'`)
export { default as MPicker } from './Picker'
export { default as MPickerView } from './PickerView'
export { default as MPopup } from './Popup'
export { default as MSinglePicker } from './SinglePicker'
export { default as MSticky } from './Sticky'
export { default as MTransition } from './Transition'
// @endindex

export type ComponentName = (
  // @index(['./[A-Z]*', '!./Style'], (pp, cc, { last }) => `'${pp.name}'${last ? '' : ' |'}`)
  'Picker' |
  'PickerView' |
  'Popup' |
  'SinglePicker' |
  'Sticky' |
  'Transition'
  // @endindex
)
