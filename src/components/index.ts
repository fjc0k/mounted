// @index('./[A-Z]*', (pp, cc) => `export {default as M${pp.name}} from '${pp.path}'`)
export {default as MDatePicker} from './DatePicker'
export {default as MECharts} from './ECharts'
export {default as MNavigationBar} from './NavigationBar'
export {default as MPicker} from './Picker'
export {default as MPickerHeader} from './PickerHeader'
export {default as MPickerView} from './PickerView'
export {default as MPopup} from './Popup'
export {default as MSinglePicker} from './SinglePicker'
export {default as MSticky} from './Sticky'
export {default as MTimePicker} from './TimePicker'
export {default as MTransition} from './Transition'
// @endindex

// @index('./**/{props,types}.ts', (pp, cc) => `export * from '${pp.path}'`)
export * from './DatePicker/props'
export * from './ECharts/props'
export * from './NavigationBar/props'
export * from './Picker/props'
export * from './Picker/types'
export * from './PickerHeader/props'
export * from './PickerView/props'
export * from './PickerView/types'
export * from './Popup/props'
export * from './SinglePicker/props'
export * from './SinglePicker/types'
export * from './Sticky/props'
export * from './TimePicker/props'
export * from './Transition/props'
// @endindex

export type ComponentName = (
  // @index('./[A-Z]*', (pp, cc, { isLast }) => `'${pp.name}'${isLast ? '' : ' |'}`)
  'DatePicker' |
  'ECharts' |
  'NavigationBar' |
  'Picker' |
  'PickerHeader' |
  'PickerView' |
  'Popup' |
  'SinglePicker' |
  'Sticky' |
  'TimePicker' |
  'Transition'
  // @endindex
)
