import './Transition.scss'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { range } from 'vtils'
import { MTransition } from '../../components'

export default class Transition extends Taro.Component<{}, {
  visible: boolean,
}> {
  constructor() {
    super(...arguments)
    this.state ={
      visible: false,
    }
  }

  toggle = (key: string) => {
    this.setState(_ => ({
      [key]: !_[key],
    } as any))
  }

  render() {
    const { visible } = this.state
    return (
      <View>
        <MTransition customClass='red' visible={visible} name='fade'>
          <View style={{ background: '#1296db' }}>
            {range(0, 20).map(index => (
              <View key={index}>
                {index}
              </View>
            ))}
          </View>
        </MTransition>
        <Button
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          onClick={this.toggle.bind(this, 'visible')}>
          set visible = {!visible}
        </Button>
      </View>
    )
  }
}
