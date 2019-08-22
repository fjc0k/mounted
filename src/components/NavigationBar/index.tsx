import './index.scss'
import Taro from '@tarojs/taro'
import { component } from '../component'
import { internalStore } from '../internal'
import { last } from 'vtils'
import { NavigationBarProps } from './props'
import { View } from '@tarojs/components'

function onlyPath(url: string) {
  return url ? url.split('?')[0].replace(/^\/+/, '') : ''
}

export default class NavigationBar extends component({
  props: NavigationBarProps,
  state: {
    verticalPadding: 0 as number,
    horizontalPadding: 0 as number,
    navigationBarHeight: 0 as number,
    navigationBarFullHeight: 0 as number,
    menuButtonHeight: 0 as number,
    menuButtonWidth: 0 as number,
    backButtonVisible: false as boolean,
    homeButtonVisible: false as boolean,
  },
}) {
  componentDidShow() {
    const menuRect = Taro.getMenuButtonBoundingClientRect()
    const sysInfo = Taro.getSystemInfoSync()
    const verticalPadding = menuRect.top - sysInfo.statusBarHeight
    const horizontalPadding = sysInfo.windowWidth - menuRect.right
    const height = menuRect.height + verticalPadding * 2
    const fullHeight = sysInfo.statusBarHeight + height

    const pages = Taro.getCurrentPages()
    const backButtonVisible = pages.length > 1
    const homeButtonVisible = onlyPath(last(pages).route) !== onlyPath(this.props.homePath)

    internalStore.customNavigationBarFullHeight = fullHeight

    this.setState({
      verticalPadding: verticalPadding,
      horizontalPadding: horizontalPadding,
      navigationBarHeight: height,
      navigationBarFullHeight: fullHeight,
      menuButtonHeight: menuRect.height,
      menuButtonWidth: menuRect.width,
      backButtonVisible: backButtonVisible,
      homeButtonVisible: homeButtonVisible,
    })
  }

  componentDidHide() {
    internalStore.customNavigationBarFullHeight = 0
  }

  componentWillUnmount() {
    internalStore.customNavigationBarFullHeight = 0
  }

  handleBackClick = () => {
    Taro.navigateBack()
  }

  handleHomeClick = () => {
    Taro.navigateTo({
      url: this.props.homePath,
    })
  }

  render() {
    const { backgroundColor, textStyle, className } = this.props
    const { verticalPadding, horizontalPadding, navigationBarHeight, navigationBarFullHeight, menuButtonHeight, menuButtonWidth, backButtonVisible, homeButtonVisible } = this.state

    const actualBackgroundColor = backgroundColor !== 'auto'
      ? backgroundColor
      : textStyle === 'white'
        ? '#000000'
        : '#FFFFFF'

    return (
      <View className={`m-navigation-bar m-navigation-bar_${textStyle} ${className}`}>
        <View
          className='m-navigation-bar__placeholder'
          style={{ height: `${navigationBarFullHeight}px` }}
        />
        <View
          className='m-navigation-bar__container'
          style={{
            backgroundColor: actualBackgroundColor,
            color: textStyle,
            height: `${navigationBarFullHeight}px`,
            padding: `${navigationBarFullHeight - navigationBarHeight + verticalPadding}px ${horizontalPadding}px ${verticalPadding}px ${horizontalPadding}px`,
          }}>
          {!backButtonVisible && !homeButtonVisible ? null : (
            <View className='m-navigation-bar__left' style={{ left: `${verticalPadding}px` }}>
              <View
                className='m-navigation-bar__menu'
                style={{
                  width: `${backButtonVisible && homeButtonVisible ? menuButtonWidth : menuButtonWidth / 2}px`,
                  height: `${menuButtonHeight}px`,
                  borderRadius: `${menuButtonHeight / 2}px`,
                }}>
                {!backButtonVisible ? null : (
                  <View
                    className='m-navigation-bar__menu-left m-navigation-bar-iconfont m-navigation-bar-icon-back'
                    onClick={this.handleBackClick}
                  />
                )}
                {!(backButtonVisible && homeButtonVisible) ? null : (
                  <View className='m-navigation-bar__menu-divider' />
                )}
                {!homeButtonVisible ? null : (
                  <View
                    className='m-navigation-bar__menu-right m-navigation-bar-iconfont m-navigation-bar-icon-home'
                    onClick={this.handleHomeClick}
                  />
                )}
              </View>
            </View>
          )}
          <View className='m-navigation-bar__title'>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}
