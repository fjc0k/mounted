import { View } from '@tarojs/components'
import { component } from '../../components/component'
import { MSinglePicker } from '../../components'

let i = 0

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

export default class SinglePicker extends component({
  state: {
    data: getData(),
    value: '日本0',
  },
}) {
  handleChange: MSinglePicker<any, any>['props']['onConfirm'] = value => {
    this.setState({ value })
  }

  render() {
    const { data, value } = this.state
    return (
      <View style={{
        fontSize: '16px',
      }}>
        <View style={{ fontWeight: 'bold', padding: '10px 0', marginBottom: '10px', borderBottom: '1px solid #eee' }}>
          NormalPicker
        </View>
        <MSinglePicker
          maskClosable={false}
          title='选择一个国家'
          data={data}
          value={value}
          onConfirm={this.handleChange}>
          {JSON.stringify(value)}
        </MSinglePicker>
      </View>
    )
  }
}
