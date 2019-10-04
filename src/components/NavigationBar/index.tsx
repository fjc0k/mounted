import Taro, {useCallback, useMemo, useState} from '@tarojs/taro'
import {functionalComponent} from '../component'
import {last} from 'vtils'
import {MNavigationBarDefaultProps, MNavigationBarProps} from './props'
import {useCustomNavigationBarFullHeight, useDidEnter, useDidLeave, usePlatform} from '../../hooks'
import {View} from '@tarojs/components'

function onlyPath(url: string) {
  return url ? url.split('?')[0].replace(/^\/+/, '') : ''
}

function MNavigationBar(props: MNavigationBarProps) {
  const platform = usePlatform()

  const {setCustomNavigationBarFullHeight, resetCustomNavigationBarFullHeight} = useCustomNavigationBarFullHeight()
  const [state, setState] = useState({
    verticalPadding: 0 as number,
    horizontalPadding: 0 as number,
    navigationBarHeight: 0 as number,
    navigationBarFullHeight: 0 as number,
    menuButtonHeight: 0 as number,
    menuButtonWidth: 0 as number,
    backButtonVisible: false as boolean,
    homeButtonVisible: false as boolean,
  })
  const actualBackgroundColor = props.backgroundColor !== 'auto'
    ? props.backgroundColor
    : props.textStyle === 'white'
      ? '#000000'
      : '#FFFFFF'

  const homeButtonVisible = useMemo(() => {
    return !props.noHome && state.homeButtonVisible
  }, [state.homeButtonVisible, props.noHome])

  useDidEnter(() => {
    const menuRect = Taro.getMenuButtonBoundingClientRect()
    const sysInfo = Taro.getSystemInfoSync()

    // 部分情况下 statusBarHeight 可能不存在或为 0，需手动计算，如：
    // 苹果手机 iOS 版本 < 13 时下开启热点等
    if (!sysInfo.statusBarHeight) {
      sysInfo.statusBarHeight = sysInfo.screenHeight - sysInfo.windowHeight
    }

    const verticalPadding = menuRect.top - sysInfo.statusBarHeight
    const horizontalPadding = sysInfo.windowWidth - menuRect.right
    const height = menuRect.height + verticalPadding * 2
    const fullHeight = sysInfo.statusBarHeight + height

    setCustomNavigationBarFullHeight(fullHeight)

    const pages = Taro.getCurrentPages()
    const backButtonVisible = pages.length > 1
    const homeButtonVisible = onlyPath(last(pages).route) !== onlyPath(props.homePath)

    setState({
      verticalPadding: verticalPadding,
      horizontalPadding: horizontalPadding,
      navigationBarHeight: height,
      navigationBarFullHeight: fullHeight,
      menuButtonHeight: menuRect.height,
      menuButtonWidth: menuRect.width,
      backButtonVisible: backButtonVisible,
      homeButtonVisible: homeButtonVisible,
    })
  })

  useDidLeave(() => !props.noReset && resetCustomNavigationBarFullHeight())

  const handleBackClick = useCallback(() => {
    Taro.navigateBack()
  }, [])

  const handleHomeClick = useCallback(() => {
    Taro.navigateTo({
      url: props.homePath,
    })
  }, [props.homePath])

  return (
    <View className={`m-navigation-bar m-navigation-bar_${props.textStyle} ${props.className}`}>
      <View
        className='m-navigation-bar__placeholder'
        style={{height: `${state.navigationBarFullHeight}px`}}
      />
      <View
        className='m-navigation-bar__container'
        style={{
          backgroundColor: actualBackgroundColor,
          color: props.textStyle,
          height: `${state.navigationBarFullHeight}px`,
          padding: `${state.navigationBarFullHeight - state.navigationBarHeight + state.verticalPadding}px ${state.horizontalPadding}px ${state.verticalPadding}px ${state.horizontalPadding}px`,
        }}>
        {!state.backButtonVisible && !homeButtonVisible ? null : (
          <View className='m-navigation-bar__left' style={{left: `${state.horizontalPadding}px`}}>
            <View
              className={`m-navigation-bar__menu is-${platform}`}
              style={{
                width: `${state.backButtonVisible && homeButtonVisible ? state.menuButtonWidth : state.menuButtonWidth / 2}px`,
                height: `${state.menuButtonHeight}px`,
              }}>
              {!state.backButtonVisible ? null : (
                <View
                  className={`m-navigation-bar__menu-left m-navigation-bar-iconfont m-navigation-bar-icon-back is-${platform}`}
                  hoverClass='m-navigation-bar__menu_active'
                  onClick={handleBackClick}
                />
              )}
              {!(state.backButtonVisible && homeButtonVisible) ? null : (
                <View className='m-navigation-bar__menu-divider'>
                  <View className={`m-navigation-bar__menu-divider__inner is-${platform}`} />
                </View>
              )}
              {!homeButtonVisible ? null : (
                <View
                  className={`m-navigation-bar__menu-right m-navigation-bar-iconfont m-navigation-bar-icon-home is-${platform}`}
                  hoverClass='m-navigation-bar__menu_active'
                  onClick={handleHomeClick}
                />
              )}
            </View>
          </View>
        )}
        <View className='m-navigation-bar__title'>
          {props.children}
        </View>
      </View>
    </View>
  )
}

export {MNavigationBarProps}

export default functionalComponent(MNavigationBarDefaultProps)(MNavigationBar)
