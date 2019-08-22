import Taro, { ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { Image, View } from '@tarojs/components'
import { MTimePicker } from '../components'
import { pageUrls } from '.'
import { XBackHome, XItem, XList, XNavigationBar, XTitle } from './components'

const codeImg = 'https://ae01.alicdn.com/kf/U53b3c5ab845b44dcaaa730be547043a8Z.png'

export default class TimePicker extends component({
  state: {
    selectedTime: [5, 20],
  },
}) {
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
        <XNavigationBar>TimePicker</XNavigationBar>
        <XTitle>时间选择</XTitle>
        <XList>
          <MTimePicker
            title='选个时间'
            selectedTime={selectedTime}
            startTime='00:30'
            endTime='22:00'
            formatHour={({ hour }) => `${hour}时`}
            formatMinute={({ minute }) => `${minute}分`}
            filterHour={({ hour }) => {
              // 过滤掉 0, 2, 4, 6, 8, 10, ..., 22 时
              return hour % 2 === 0
            }}
            filterMinute={({ minute }) => {
              // 过滤掉 10 分
              return minute === 10
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
