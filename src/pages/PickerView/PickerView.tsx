import { View, Button, Input } from '@tarojs/components'
import { sample, range } from 'vtils'
import { component } from '../../components/component'
import MPickerView from '../../components/PickerView'

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

export default class PickerView extends component({
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
  handleChange: MPickerView<any, any>['props']['onChange'] = value => {
    this.setState({ value })
  }

  handleAppendClick = () => {
    const { data } = this.state
    this.setState({
      data: data.concat([getData()]),
    })
  }

  handlePopClick = () => {
    const { data } = this.state
    data.pop()
    this.setState({ data })
  }

  handleChangeClick = () => {
    const { data } = this.state
    data[sample(range(0, data.length))] = getData()
    this.setState({ data })
  }

  handleInput = (e: any) => {
    this.setState({
      value: JSON.parse(e.detail.value),
    })
  }

  handleChange2: MPickerView<any, any>['props']['onChange'] = value => {
    console.log('changed')
    this.setState({ cascadedValue: value })
  }

  handleInput2 = (e: any) => {
    this.setState({
      cascadedValue: JSON.parse(e.detail.value),
    })
  }

  render() {
    const { data, value, cascadedData, cascadedValue } = this.state
    return (
      <View style={{
        fontSize: '20px',
      }}>
        <View style={{ fontWeight: 'bold', padding: '10px 0', marginBottom: '10px', borderBottom: '1px solid #eee' }}>
          NormalPickerView
        </View>
        <MPickerView
          data={data}
          visibleItemCount={4}
          itemHeight='120rpx'
          value={value}
          onChange={this.handleChange}
        />
        <Input
          value={JSON.stringify(value)}
          onInput={this.handleInput}
          style={{
            marginTop: '20px',
            textAlign: 'center',
            border: '1px solid gray',
            padding: '10px',
            fontSize: '13px',
          }}
        />
        <Button onClick={this.handleAppendClick} style={{ marginTop: '20px' }}>
          Append Data
        </Button>
        <Button onClick={this.handlePopClick} style={{ marginTop: '20px' }}>
          Pop Data
        </Button>
        <Button onClick={this.handleChangeClick} style={{ marginTop: '20px' }}>
          Change Data
        </Button>

        <View style={{ fontWeight: 'bold', padding: '10px 0', marginBottom: '10px', borderBottom: '1px solid #eee' }}>
          CascadedPickerView
        </View>
        <MPickerView
          data={cascadedData}
          visibleItemCount={4}
          itemHeight='120rpx'
          value={cascadedValue}
          onChange={this.handleChange2}
        />
        <Input
          value={JSON.stringify(cascadedValue)}
          onInput={this.handleInput2}
          style={{
            marginTop: '20px',
            textAlign: 'center',
            border: '1px solid gray',
            padding: '10px',
            fontSize: '13px',
          }}
        />
      </View>
    )
  }
}
