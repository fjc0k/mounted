import Taro from '@tarojs/taro'
import { createProps, functionalComponent } from '../../../components/component'
import { MNavigationBar } from '../../../components'
import { pageUrls } from '../../pages'

const XNavigationBarDefaultProps = createProps({})

export type XNavigationBarProps = typeof XNavigationBarDefaultProps

function XNavigationBar(props: XNavigationBarProps) {
  return (
    <MNavigationBar
      homePath={pageUrls.HomeIndex}
      textStyle='white'
      backgroundColor='#1AAD19'>
      {props.children}
    </MNavigationBar>
  )
}

export default functionalComponent(XNavigationBarDefaultProps, true)(XNavigationBar)
