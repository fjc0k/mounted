import './BackHome.scss'
import Taro from '@tarojs/taro'
import XIcon from './Icon'
import { component } from '../../components/component'
import { pageUrls } from '..'
import { View } from '@tarojs/components'

export default class XBackHome extends component({
  disableGlobalClass: true,
  state: {
    visible: false as boolean,
  },
}) {
  componentDidMount() {
    this.setState({
      visible: Taro.getCurrentPages().length === 1,
    })
  }

  render() {
    const { visible } = this.state
    return visible ? (
      <View
        className='button'
        hoverClass='active'
        hoverStayTime={100}
        onClick={() => {
          Taro.redirectTo({
            url: pageUrls.Home,
          })
        }}>
        <XIcon name='home' />
      </View>
    ) : null
  }
}
