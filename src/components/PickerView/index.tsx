import Taro from '@tarojs/taro'
import { Block, PickerView, PickerViewColumn, View } from '@tarojs/components'
import { clamp, isArray, isEqualArray, isNumber, noop, parseCSSValue } from 'vtils'
import { component } from '../component'
import { MPickerViewProps } from './props'

/** 普通条目 */
export interface NormalItem {
  /** 标签，用于显示 */
  label: string,
  [key: string]: any,
}

/** 普通列表 */
export type NormalList = NormalItem[]

/** 普通数据 */
export type NormalData = NormalList[]

/** 级联条目 */
export interface CascadedItem extends NormalItem {
  /** 下级选项数据 */
  children?: CascadedData,
}

/** 级联列表 */
export type CascadedList = CascadedItem[]

/** 级联数据 */
export type CascadedData = CascadedList

/** 条目 */
export type Item = NormalItem | CascadedItem

/** 列表 */
export type List = NormalList | CascadedList

/** 数据 */
export type Data = NormalData | CascadedData

/**
 * 选择器视图组件。
 */
export default class MPickerView extends component({
  props: MPickerViewProps,
  state: {
    /** 选中条目的索引列表 */
    localSelectedIndexes: [] as number[],
    /** 规范化的选项数据 */
    normalizedData: [] as NormalData,
  },
}) {
  /** 是否级联 */
  isCascaded: boolean = false

  componentWillMount() {
    this.update(
      this.props,
      {
        data: null,
        selectedIndexes: this.state.localSelectedIndexes,
      },
    )
  }

  componentWillReceiveProps(nextProps: MPickerView['props']) {
    this.update(
      nextProps,
      {
        data: this.props.data,
        selectedIndexes: this.state.localSelectedIndexes,
      },
    )
  }

  /**
   * 更新状态。
   *
   * @param nextProps 新的 props 数据
   * @param prevProps 旧的 props 数据
   * @param [callback=noop] 更新完成后的回调函数
   * @param [disableEmitChangeEvent=false] 是否禁止触发 change 事件
   */
  update(
    { data, selectedIndexes }: Pick<MPickerView['props'], 'data' | 'selectedIndexes'>,
    { data: prevData, selectedIndexes: prevSelectedIndexes }: Pick<MPickerView['props'], 'data' | 'selectedIndexes'>,
    callback: () => void = noop,
    disableEmitChangeEvent: boolean = false,
  ) {
    this.isCascaded = !isArray(data[0])

    // 若数据未变，且 selectedIndexes 未变，则不触发更新
    if (data === prevData && isEqualArray(selectedIndexes, prevSelectedIndexes)) return

    const shouldRestoreSelectedIndex = data !== prevData
    const normalizedData: NormalData = []
    const revisedSelectedIndexes: number[] = []

    let colIndex = 0
    let colData: List = this.isCascaded ? data as CascadedList : data[0] as NormalList
    while (colData) {
      const selectedIndex = clamp(
        shouldRestoreSelectedIndex && isNumber(prevSelectedIndexes[colIndex])
          ? prevSelectedIndexes[colIndex]
          : selectedIndexes[colIndex],
        0,
        colData.length - 1,
      )
      normalizedData.push(colData)
      revisedSelectedIndexes.push(selectedIndex)
      colIndex++
      colData = (
        this.isCascaded
          ? (
            colData[selectedIndex]
              ? (
                (colData[selectedIndex] as CascadedItem).children && (colData[selectedIndex] as CascadedItem).children.length
                  ? (colData[selectedIndex] as CascadedItem).children
                  : undefined
              )
              : undefined
          )
          : data[colIndex] as NormalList
      )
    }

    this.setState(
      {
        normalizedData,
        localSelectedIndexes: revisedSelectedIndexes,
      },
      callback,
    )

    if (!disableEmitChangeEvent && data !== prevData) {
      this.props.onChange(revisedSelectedIndexes.slice())
    }
  }

  computeStyles(): { [key in 'view' | 'indicator']: React.CSSProperties } {
    const { visibleItemCount, itemHeight } = this.props
    const { value: pureItemHeight, unit } = parseCSSValue(itemHeight)
    const viewHeight = `${pureItemHeight * visibleItemCount}${unit}`
    return {
      view: {
        height: viewHeight,
      },
      indicator: {
        height: itemHeight,
      },
    }
  }

  normalizeSeparator(): Array<string | number> {
    const { separator } = this.props
    const separatorIsArray = isArray(separator)
    const normalizedSeparator: Array<string | number> = []
    for (let i = 0; i < this.state.normalizedData.length - 1; i++) {
      normalizedSeparator.push(
        separatorIsArray
          ? separator[i]
          : separator,
      )
    }
    return normalizedSeparator.map(
      separator => separator == null || separator === '' ? null : separator,
    )
  }

  handleChange = (e: { detail: { value: number[] } }) => {
    const { normalizedData } = this.state

    const selectedIndexes = e.detail.value
      // 去除 separator 的值
      .filter((_, i) => i % 2 === 0)
      // 尽管数据列数有变化，selectedIndexes 却仍是之前的长度
      .slice(0, normalizedData.length)

    this.setState({ localSelectedIndexes: selectedIndexes }, () => {
      if (this.isCascaded) {
        // 级联数据应先更新再触发 change 事件
        this.update(
          {
            data: { ...this.props.data }, // 触发索引记忆
            selectedIndexes: selectedIndexes,
          },
          {
            data: this.props.data,
            selectedIndexes: selectedIndexes,
          },
          () => {
            const { localSelectedIndexes } = this.state
            this.props.onChange(localSelectedIndexes.slice())
          },
          true,
        )
      } else {
        this.props.onChange(selectedIndexes.slice())
      }
    })
  }

  render() {
    const { disabled, className } = this.props
    const { normalizedData, localSelectedIndexes } = this.state

    const styles = this.computeStyles()
    const normalizedSeparator = this.normalizeSeparator()

    // 加上 separator 的值
    const fullSelectedIndexes = localSelectedIndexes.slice()
    for (let i = 0, len = fullSelectedIndexes.length; i < len; i++) {
      fullSelectedIndexes.splice(i * 2 + 1, 0, 0)
    }

    return (
      <PickerView
        value={fullSelectedIndexes}
        className={`m-picker-view ${disabled && 'm-picker-view_disabled'} ${className}`}
        style={styles.view}
        indicatorStyle={`height:${styles.indicator.height}`}
        onPickStart={this.props.onPickStart}
        onPickEnd={this.props.onPickEnd}
        onChange={this.handleChange}>
        {normalizedData.map((colData, colIndex) => (
          <Block key={colIndex.toString()}>
            <PickerViewColumn key={`column-${colIndex.toString()}`}>
              {colData.map((item, itemIndex) => (
                <View key={itemIndex.toString()} className='m-picker-view__item'>
                  <View className='m-picker-view__item__label'>
                    {item.label}
                  </View>
                </View>
              ))}
            </PickerViewColumn>
            <PickerViewColumn
              key={`separator-${colIndex.toString()}`}
              className={`m-picker-view__separator ${normalizedSeparator[colIndex] == null && 'm-picker-view__separator_empty'}`}>
              {normalizedSeparator[colIndex] == null ? null : (
                <View className='m-picker-view__item'>
                  <View className='m-picker-view__item__label'>
                    {normalizedSeparator[colIndex]}
                  </View>
                </View>
              )}
            </PickerViewColumn>
          </Block>
        ))}
      </PickerView>
    )
  }
}
