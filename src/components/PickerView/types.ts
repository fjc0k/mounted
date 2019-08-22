/** 普通条目 */
export interface MPickerViewNormalItem {
  /** 标签，用于显示 */
  label: string,
  [key: string]: any,
}

/** 普通列表 */
export type MPickerViewNormalList = MPickerViewNormalItem[]

/** 普通数据 */
export type MPickerViewNormalData = MPickerViewNormalList[]

/** 级联条目 */
export interface MPickerViewCascadedItem extends MPickerViewNormalItem {
  /** 下级选项数据 */
  children?: MPickerViewCascadedData,
}

/** 级联列表 */
export type MPickerViewCascadedList = MPickerViewCascadedItem[]

/** 级联数据 */
export type MPickerViewCascadedData = MPickerViewCascadedList

/** 条目 */
export type MPickerViewItem = MPickerViewNormalItem | MPickerViewCascadedItem

/** 列表 */
export type MPickerViewList = MPickerViewNormalList | MPickerViewCascadedList

/** 数据 */
export type MPickerViewData = MPickerViewNormalData | MPickerViewCascadedData
