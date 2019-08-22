import Taro from '@tarojs/taro'
import { component } from '../../components/component'
import { MNavigationBar } from '../../components'
import { pageUrls } from '..'

export default class XNavigationBar extends component({
  disableGlobalClass: true,
}) {
  render() {
    return (
      <MNavigationBar
        homePath={pageUrls.Home}
        textStyle='white'
        backgroundColor='#1AAD19'>
        {this.props.children}
      </MNavigationBar>
    )
  }
}
