import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { Image, View } from '@tarojs/components'
import { MTimePicker } from '../components'
import { pageUrls } from '.'
import { XBackHome, XItem, XList, XTitle } from './components'

const codeImg = 'https://ws1.sinaimg.cn/large/d9ddb3f8gy1g1y2gs4hmlj20hi16qwfk.jpg'

export default class TimePicker extends component({
  state: {
    selectedTime: [5, 20],
  },
}) {
  config: Config = {
    navigationBarTitleText: 'TimePicker',
  }

  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'TimePicker',
      path: pageUrls.TimePicker,
    }
  }

  render() {
    const { selectedTime } = this.state
    return (
      <View>
        <XTitle>时间选择</XTitle>
        <XList>
          <MTimePicker
            title='选个时间'
            selectedTime={selectedTime}
            startTime='00:30'
            endTime='22:00'
            formatHour='hh时'
            formatMinute='ii分'
            onFilterHour={payload => {
              if (payload.hour % 2 === 0) {
                payload.reject()
              }
            }}
            onFilterMinute={payload => {
              if (payload.minute === 10) {
                payload.reject()
              }
            }}
            onConfirm={selectedTime => {
              this.setState({ selectedTime })
            }}>
            <XItem
              title='选个时间'
              extra={selectedTime.join(':')}
              arrow={true}
              feedback={true}
            />
          </MTimePicker>
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
