import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { Image, View } from '@tarojs/components'
import { MFormIdCollector } from '../components'
import { pageUrls } from '.'
import { XBackHome, XItem, XList, XTitle } from './components'

const codeImg = 'https://ws1.sinaimg.cn/large/d9ddb3f8gy1g1z12p1m39j20j80iq0t3.jpg'

export default class FormIdCollector extends component({
  disableGlobalClass: true,
}) {
  config: Config = {
    navigationBarTitleText: 'FormIdCollector',
  }

  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'FormIdCollector',
      path: pageUrls.FormIdCollector,
    }
  }

  render() {
    return (
      <View>

        <XTitle>FormId 收集器</XTitle>
        <XList>
          <MFormIdCollector
            count={5}
            onCollect={formIds => {
              Taro.showModal({
                title: '收集到的 FormId',
                content: JSON.stringify(formIds),
                confirmColor: '#1AAD19',
                showCancel: false,
              })
            }}>
            <XItem
              title='点我看效果'
              arrow={true}
              feedback={true}
            />
          </MFormIdCollector>
          <XItem>
            <Image
              src={codeImg}
              style={{ width: '100%' }}
              mode='widthFix'
              onClick={() => {
                Taro.previewImage({
                  current: codeImg,
                  urls: [codeImg],
                })
              }}
            />
          </XItem>
        </XList>
        <XBackHome />
      </View>
    )
  }
}
