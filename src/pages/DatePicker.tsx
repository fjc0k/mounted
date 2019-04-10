import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { Image, View } from '@tarojs/components'
import { MDatePicker } from '../components'
import { pageUrls } from '.'
import { XBackHome, XItem, XList, XTitle } from './components'

const codeImg = 'https://ws1.sinaimg.cn/large/d9ddb3f8gy1g1y2gs4hmlj20hi16qwfk.jpg'

export default class DatePicker extends component({
  state: {
    selectedDate: [2013, 5, 20],
  },
}) {
  config: Config = {
    navigationBarTitleText: 'DatePicker',
  }

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
        <XTitle>单项选择</XTitle>
        <XList>
          <MDatePicker
            title='选个日期'
            selectedDate={selectedDate}
            startDate='2010-2-2'
            endDate='2020-10-1'
            formatYear='yyyy年'
            formatMonth='mm月'
            formatDay='dd日'
            onFilterYear={payload => {
              if (
                payload.year === 2011
                  || payload.year === 2019
              ) {
                payload.reject()
              }
            }}
            onFilterMonth={payload => {
              if (payload.month % 3 === 0) {
                payload.reject()
              }
            }}
            onFilterDay={payload => {
              if (
                payload.year === 2020
                  && payload.month === 5
                  && payload.day === 19
              ) {
                payload.reject()
              }
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
