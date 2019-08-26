import Taro, {useEffect, useMemo, useRef, useState} from '@tarojs/taro'
import {Block, PickerView, PickerViewColumn, View} from '@tarojs/components'
import {clamp, isArray, isNumber, parseCSSValue} from 'vtils'
import {functionalComponent} from '../component'
import {MPickerViewCascadedItem, MPickerViewCascadedList, MPickerViewList, MPickerViewNormalData, MPickerViewNormalList} from './types'
import {MPickerViewDefaultProps, MPickerViewProps} from './props'
import {usePrevious} from '../../hooks'

function MPickerView(props: MPickerViewProps) {
  // 选中条目的索引列表
  const [localSelectedIndexes, setLocalSelectedIndexes] = useState<number[]>([])
  // 规范化的选项数据
  const [normalizedData, setNormalizedData] = useState<MPickerViewNormalData>([])
  // 是否级联
  const isCascaded = useRef<boolean>(false)
  const prevData = usePrevious(props.data, [])
  const prevSelectedIndexes = usePrevious(props.selectedIndexes, [])
  // 样式
  const styles = useMemo<Record<'view' | 'indicator', React.CSSProperties>>(
    () => {
      const {visibleItemCount, itemHeight} = props
      const {value: pureItemHeight, unit} = parseCSSValue(itemHeight)
      const viewHeight = `${pureItemHeight * visibleItemCount}${unit}`
      return {
        view: {
          height: viewHeight,
        },
        indicator: {
          height: itemHeight,
        },
      }
    },
    [props],
  )
  // 分隔符
  const separators = useMemo<any[]>(
    () => {
      const {separator} = props
      const separatorIsArray = isArray(separator)
      const normalizedSeparator = []
      for (let i = 0; i < normalizedData.length - 1; i++) {
        normalizedSeparator.push(
          separatorIsArray
            ? separator[i]
            : separator,
        )
      }
      return normalizedSeparator.map(
        separator => separator == null || separator === ''
          ? null
          : separator,
      )
    },
    [props, normalizedData.length],
  )
  const fullSelectedIndexes = useMemo<number[]>(
    () => {
      const selectedIndexes = localSelectedIndexes.slice()
      for (let i = 0, len = selectedIndexes.length; i < len; i++) {
        selectedIndexes.splice(i * 2 + 1, 0, 0)
      }
      return selectedIndexes
    },
    [localSelectedIndexes],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function update(nextProps: Pick<MPickerViewProps, 'data' | 'selectedIndexes'>, prevProps: Pick<MPickerViewProps, 'data' | 'selectedIndexes'>, emit = false) {
    const {data, selectedIndexes} = nextProps
    const {data: prevData, selectedIndexes: prevSelectedIndexes} = prevProps
    isCascaded.current = !isArray(data[0])
    const shouldRestoreSelectedIndex = data !== prevData
    const normalizedData: MPickerViewNormalData = []
    const revisedSelectedIndexes: number[] = []

    let colIndex = 0
    let colData: MPickerViewList = isCascaded.current
      ? data as MPickerViewCascadedList
      : data[0] as MPickerViewNormalList
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
        isCascaded.current
          ? (
            colData[selectedIndex]
              ? (
                (colData[selectedIndex] as MPickerViewCascadedItem).children && (colData[selectedIndex] as MPickerViewCascadedItem).children.length
                  ? (colData[selectedIndex] as MPickerViewCascadedItem).children
                  : undefined
              )
              : undefined
          )
          : data[colIndex] as MPickerViewNormalList
      )
    }

    setNormalizedData(normalizedData)
    setLocalSelectedIndexes(revisedSelectedIndexes)

    if (emit) {
      props.onChange(revisedSelectedIndexes.slice())
    }
  }

  useEffect(
    () => {
      update(
        {
          data: props.data,
          selectedIndexes: props.selectedIndexes,
        },
        {
          data: prevData,
          selectedIndexes: prevSelectedIndexes,
        },
      )
    },
    [prevData, prevSelectedIndexes, props.data, props.selectedIndexes, update],
  )

  function handleChange(e: any) {
    const selectedIndexes = (e.detail.value as number[])
      // 去除 separator 的值
      .filter((_, i) => i % 2 === 0)
      // 尽管数据列数有变化，selectedIndexes 却仍是之前的长度
      .slice(0, normalizedData.length)

    setLocalSelectedIndexes(selectedIndexes)

    if (!isCascaded.current) {
      props.onChange(selectedIndexes.slice())
    } else {
      update(
        {
          data: props.data.slice(), // 触发索引记忆
          selectedIndexes: selectedIndexes,
        },
        {
          data: props.data,
          selectedIndexes: selectedIndexes,
        },
        true,
      )
    }
  }

  return (
    <PickerView
      value={fullSelectedIndexes}
      className={`m-picker-view ${props.disabled && 'm-picker-view_disabled'} ${props.className}`}
      style={styles.view}
      indicatorStyle={`height:${styles.indicator.height}`}
      onPickStart={props.onPickStart}
      onPickEnd={props.onPickEnd}
      onChange={handleChange}>
      {normalizedData.map((colData, colIndex) => (
        <Block key={String(colIndex)}>
          <PickerViewColumn key={`column-${String(colIndex)}`}>
            {colData.map((item, itemIndex) => (
              <View key={String(itemIndex)} className='m-picker-view__item'>
                <View className='m-picker-view__item__label'>
                  {item.label}
                </View>
              </View>
            ))}
          </PickerViewColumn>
          <PickerViewColumn
            key={`separator-${String(colIndex)}`}
            className={`m-picker-view__separator ${separators[colIndex] == null && 'm-picker-view__separator_empty'}`}>
            {separators[colIndex] == null ? null : (
              <View className='m-picker-view__item'>
                <View className='m-picker-view__item__label'>
                  {separators[colIndex]}
                </View>
              </View>
            )}
          </PickerViewColumn>
        </Block>
      ))}
    </PickerView>
  )
}

export * from './types'

export {MPickerViewProps}

export default functionalComponent(MPickerViewDefaultProps)(MPickerView)
