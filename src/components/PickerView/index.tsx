import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import { parseCSSValue, noop, isArray, isEqualArray, isNumber, clamp } from 'vtils'
import { component } from '../component'
import _ from './index.module.scss'

export type NormalItem<V = any> = {
  label: string | number,
  value: V,
}

export type NormalColData<V = any> = NormalItem<V>[]

export type NormalData<V = any> = NormalColData<V>[]

export type CascadedItem<V = any> = {
  label: string | number,
  value: V,
  children?: CascadedData<V>,
}

export type CascadedColData<V = any> = CascadedItem<V>[]

export type CascadedData<V = any> = CascadedColData<V>

export type ColData<V = any> = NormalColData<V> | CascadedColData<V>

export type Data<V = any> = NormalData<V> | CascadedData<V>

export default class MPickerView<D extends Data, V extends (D extends Data<infer VV> ? VV : any)> extends component({
  props: {
    data: [],
    value: [],
    itemHeight: '2.5em' as string,
    visibleItemCount: 5 as number,
    onChange: noop,
  },
  state: {
    selectedIndexes: [] as number[],
    normalizedData: [],
  },
})<{
  data: D,
  value?: V[],
  onChange?: (value: V[]) => void,
}, {
  normalizedData: NormalData<V>,
}> {
  isCascaded: boolean = false

  prevValue: V[] = null

  componentWillMount() {
    this.update(this.props, { data: null, value: this.prevValue })
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps, { ...this.props, value: this.prevValue })
  }

  update(
    { data, value }: MPickerView<D, V>['props'],
    { data: prevData, value: prevValue }: MPickerView<D, V>['props'],
    callback: () => void = noop,
    disableEmitChangeEvent: boolean = false
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
            item => item.value === value[colIndex]
          ),
        0,
        colData.length - 1
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
      callback
    )

    if (!disableEmitChangeEvent && data !== prevData) {
      this.prevValue = selectedIndexes.map(
        (selectedIndex, colIndex) => normalizedData[colIndex][selectedIndex].value
      )
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
        (selectedIndex, colIndex) => normalizedData[colIndex][selectedIndex].value
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
              (selectedIndex, colIndex) => normalizedData[colIndex][selectedIndex].value
            )
            this.props.onChange(this.prevValue)
          },
          true
        )
      } else {
        this.props.onChange(this.prevValue)
      }
    })
  }

  render() {
    const { normalizedData, selectedIndexes } = this.state
    const styles = this.computeStyles()
    return (
      <PickerView
        value={selectedIndexes}
        style={styles.view}
        indicatorStyle={`height:${styles.indicator.height}`}
        onChange={this.handleChange}>
        {normalizedData.map((colData, colIndex) => (
          <PickerViewColumn key={colIndex}>
            {colData.map((item, itemIndex) => (
              <View className={_.item} key={itemIndex}>
                <View className={_.label}>
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
