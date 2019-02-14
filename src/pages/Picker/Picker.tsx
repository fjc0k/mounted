import { View } from '@tarojs/components'
import { component } from '../../components/component'
import { MPicker } from '../../components'

let i = 0
let l = 0

const getData = () => {
  const flag = i++
  return [
    `中国${flag}`,
    `日本${flag}`,
    `美国${flag}`,
    `俄罗斯${flag}`,
  ].reduce((res, country) => {
    res.push({
      label: country,
      value: country,
    })
    return res
  }, [] as any)
}

const getCascadedData = () => {
  const flag = l++
  return [
    `中国${flag}`,
    `日本${flag}`,
    `美国${flag}`,
    `俄罗斯${flag}`,
  ].reduce((res, country) => {
    res.push({
      label: country,
      value: country,
    })
    return res
  }, [] as any)
}

export default class Picker extends component({
  state: {
    data: [
      getData(),
      getData(),
    ],
    value: ['日本0', '俄罗斯1'],
    cascadedData: getCascadedData().map(colData => {
      colData.children = getCascadedData()
      colData.children.map(colData2 => {
        colData2.children = getCascadedData()
        return colData2
      })
      return colData
    }),
    cascadedValue: ['日本0', '俄罗斯1'],
  },
}) {
  handleChange: MPicker<any, any>['props']['onConfirm'] = value => {
    this.setState({ value })
  }

  handleChange2: MPicker<any, any>['props']['onConfirm'] = value => {
    console.log('changed')
    this.setState({ cascadedValue: value })
  }

  render() {
    const { data, value, cascadedData, cascadedValue } = this.state
    return (
      <View style={{
        fontSize: '16px',
      }}>
        <View style={{ fontWeight: 'bold', padding: '10px 0', marginBottom: '10px', borderBottom: '1px solid #eee' }}>
          NormalPicker
        </View>
        <MPicker
          maskClosable={false}
          title='选择一个国家'
          data={data}
          value={value}
          onConfirm={this.handleChange}>
          {JSON.stringify(value)}
        </MPicker>

        <View style={{ fontWeight: 'bold', padding: '10px 0', marginBottom: '10px', borderBottom: '1px solid #eee' }}>
          CascadedPicker
        </View>
        <MPicker
          title='选择你喜欢的城市'
          noCancel={true}
          data={cascadedData}
          visibleItemCount={4}
          value={cascadedValue}
          onConfirm={this.handleChange2}>
          {JSON.stringify(cascadedValue)}
        </MPicker>
      </View>
    )
  }
}
