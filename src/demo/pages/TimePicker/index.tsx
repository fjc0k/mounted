import Taro, { useShareAppMessage, useState } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { MTimePicker } from '../../../components'
import { pageUrls } from '..'
import { XItem, XList, XNavigationBar, XTitle } from '../../components'

const codeImg = 'https://ae01.alicdn.com/kf/U53b3c5ab845b44dcaaa730be547043a8Z.png'

export default function TimePicker() {
  const [selectedTime, setSelectedTime] = useState(() => [5, 20])

  useShareAppMessage(() => ({
    title: 'TimePicker',
    path: pageUrls.TimePickerIndex,
  }))

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
            setSelectedTime(selectedTime)
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
    </View>
  )
}
