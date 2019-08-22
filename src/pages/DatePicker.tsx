import Taro, { ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { Image, View } from '@tarojs/components'
import { MDatePicker } from '../components'
import { pageUrls } from '.'
import { XBackHome, XItem, XList, XNavigationBar, XTitle } from './components'

const codeImg = 'https://ae01.alicdn.com/kf/Ua09c76aa494640e89c84432e7ad02a381.png'

export default class DatePicker extends component({
  state: {
    selectedDate: [2013, 5, 20],
  },
}) {
  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'DatePicker',
      path: pageUrls.DatePicker,
    }
  }

  render() {
    const { selectedDate } = this.state
    return (
      <View>
        <XNavigationBar>DatePicker</XNavigationBar>
        <XTitle>日期选择</XTitle>
        <XList>
          <MDatePicker
            title='选个日期'
            selectedDate={selectedDate}
            startDate='2010-2-2'
            endDate='2020-10-1'
            formatYear={({ year }) => `${year}年`}
            formatDay={({ day }) => `${day}日`}
            filterYear={({ year }) => {
              // 过滤掉 2011 年和 2019 年
              return year === 2011 || year === 2019
            }}
            filterMonth={({ month }) => {
              // 过滤掉 3, 6, 9, 12 月份
              return month % 3 === 0
            }}
            onConfirm={selectedDate => {
              this.setState({ selectedDate })
            }}>
            <XItem
              title='选个日期'
              extra={selectedDate.join('-')}
              arrow={true}
              feedback={true}
            />
          </MDatePicker>
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
