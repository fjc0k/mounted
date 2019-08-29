/** 普通条目 */
export type MPickerViewNormalItem<P = {}> = {
  /** 标签，用于显示 */
  label: string,
} & P

/** 普通列表 */
export type MPickerViewNormalList<P = {}> = MPickerViewNormalItem<P>[]

/** 普通数据 */
export type MPickerViewNormalData<P = {}> = MPickerViewNormalList<P>[]

/** 级联条目 */
export type MPickerViewCascadedItem<P = {}> = MPickerViewNormalItem<P> & {
  /** 下级选项数据 */
  children?: MPickerViewCascadedData<P>,
}

/** 级联列表 */
export type MPickerViewCascadedList<P = {}> = MPickerViewCascadedItem<P>[]

/** 级联数据 */
export type MPickerViewCascadedData<P = {}> = MPickerViewCascadedList<P>

/** 条目 */
export type MPickerViewItem<P = {}> = MPickerViewNormalItem<P> | MPickerViewCascadedItem<P>

/** 列表 */
export type MPickerViewList<P = {}> = MPickerViewNormalList<P> | MPickerViewCascadedList<P>

/** 数据 */
export type MPickerViewData<P = {}> = MPickerViewNormalData<P> | MPickerViewCascadedData<P>
