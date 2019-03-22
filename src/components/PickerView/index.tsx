import defaultProps from './defaultProps'
import Taro from '@tarojs/taro'
import { clamp, isArray, isEqualArray, isNumber, noop, parseCSSValue } from 'vtils'
import { component } from '../component'
import { PickerView, PickerViewColumn, View } from '@tarojs/components'

export interface NormalItem<V = any> {
  /** 标签，用于显示 */
  label: string | number,
  /** 值 */
  value: V,
}

export type NormalColData<V = any> = NormalItem<V>[]

export type NormalData<V = any> = NormalColData<V>[]

export interface CascadedItem<V = any> extends NormalItem<V> {
  /** 下级选项数据 */
  children?: CascadedData<V>,
}

export type CascadedColData<V = any> = CascadedItem<V>[]

export type CascadedData<V = any> = CascadedColData<V>

export type ColData<V = any> = NormalColData<V> | CascadedColData<V>

/** 条目 */
export type Item<V = any> = NormalItem<V> | CascadedItem<V>

/** 选项数据 */
export type Data<V = any> = NormalData<V> | CascadedData<V>

/**
 * 选择器视图组件。
 */
export default class MPickerView<D extends Data = Data, V extends (D extends Data<infer VV> ? VV : any) = any> extends component({
  props: {
    ...defaultProps,
    /** 选择开始事件 */
    onPickStart: noop as () => void,
    /** 选择结束事件 */
    onPickEnd: noop as () => void,
  },
  state: {
    /** 选中条目的索引列表 */
    selectedIndexes: [] as number[],
    normalizedData: [],
  },
})<{
  /** 选项数据 */
  data: D,
  /** 选中条目的值列表 */
  value?: V[],
  /** 选中值改变事件 */
  onChange?: (value: V[]) => void,
}, {
  /** 规范化的选项数据 */
  normalizedData: NormalData<V>,
}> {
  /** 是否级联 */
  isCascaded: boolean = false

  /** 上一次选中的值 */
  prevValue: V[] = null

  componentWillMount() {
    this.update(this.props, { data: null, value: this.prevValue })
  }

  componentWillReceiveProps(nextProps: MPickerView<any>['props']) {
    this.update(nextProps, { ...this.props, value: this.prevValue })
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
    { data, value }: MPickerView<D, V>['props'],
    { data: prevData, value: prevValue }: MPickerView<D, V>['props'],
    callback: () => void = noop,
    disableEmitChangeEvent: boolean = false,
  ) {
    this.isCascaded = !isArray(data[0])

    // 若数据未变，且 value 未变，则不触发更新
    if (data === prevData && isEqualArray(value, prevValue)) return

    const shouldRestoreSelectedIndex = data !== prevData
    const prevSelectedIndexes: number[] = this.state.selectedIndexes
    const normalizedData: NormalData<V> = []
    const selectedIndexes: number[] = []

    let colIndex = 0
    let colData: ColData<V> = this.isCascaded ? data as CascadedColData<V> : data[0] as NormalColData<V>
    while (colData) {
      const selectedIndex = clamp(
        shouldRestoreSelectedIndex && isNumber(prevSelectedIndexes[colIndex])
          ? prevSelectedIndexes[colIndex]
          : colData.findIndex(
            item => item.value === value[colIndex],
          ),
        0,
        colData.length - 1,
      )
      normalizedData.push(colData)
      selectedIndexes.push(selectedIndex)
      colIndex++
      colData = this.isCascaded ? (colData[selectedIndex] as CascadedItem<V>).children : data[colIndex] as NormalColData<V>
    }

    this.setState(
      {
        normalizedData,
        selectedIndexes,
      },
      callback,
    )

    this.prevValue = selectedIndexes.map(
      (selectedIndex, colIndex) => normalizedData[colIndex][selectedIndex].value,
    )

    if (!disableEmitChangeEvent && data !== prevData) {
      this.props.onChange(this.prevValue)
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

  handleChange = (e: { detail: { value: number[] } }) => {
    const { normalizedData } = this.state

    // fix: 尽管数据列数有变化，value 却仍是之前的长度
    const selectedIndexes = e.detail.value.slice(0, normalizedData.length)

    this.setState({ selectedIndexes }, () => {
      this.prevValue = selectedIndexes.map(
        (selectedIndex, colIndex) => normalizedData[colIndex][selectedIndex].value,
      )
      if (this.isCascaded) {
        // 级联数据应先更新再触发 change 事件
        this.update(
          {
            ...this.props,
            data: { ...this.props.data }, // 触发索引记忆
            value: this.prevValue,
          },
          this.props,
          () => {
            const { normalizedData, selectedIndexes } = this.state
            this.prevValue = selectedIndexes.map(
              (selectedIndex, colIndex) => normalizedData[colIndex][selectedIndex].value,
            )
            this.props.onChange(this.prevValue)
          },
          true,
        )
      } else {
        this.props.onChange(this.prevValue)
      }
    })
  }

  render() {
    const { disabled } = this.props
    const { normalizedData, selectedIndexes } = this.state
    const styles = this.computeStyles()
    return (
      <PickerView
        value={selectedIndexes}
        className={`m-picker-view ${disabled && 'm-picker-view_disabled'}`}
        style={styles.view}
        indicatorStyle={`height:${styles.indicator.height}`}
        onPickStart={this.props.onPickStart}
        onPickEnd={this.props.onPickEnd}
        onChange={this.handleChange}>
        {normalizedData.map((colData, colIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <PickerViewColumn key={colIndex}>
            {colData.map((item, itemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <View key={itemIndex} className='m-picker-view__item'>
                <View className='m-picker-view__item__label'>
                  {item.label}
                </View>
              </View>
            ))}
          </PickerViewColumn>
        ))}
      </PickerView>
    )
  }
}
