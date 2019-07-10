import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { Image, View } from '@tarojs/components'
import { MDatePicker } from '../components'
import { pageUrls } from '.'
import { XBackHome, XItem, XList, XTitle } from './components'

const codeImg = 'https://ws1.sinaimg.cn/large/d9ddb3f8gy1g2qhfx9cj8j20pc0wqgmo.jpg'

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
        <XTitle>日期选择</XTitle>
        <XList>
          <MDatePicker
            title='选个日期'
            selectedDate={selectedDate}
            startDate='2010-2-2'
            endDate='2020-10-1'
            formatYear={_ => `${_.year}年`}
            formatDay={_ => `${_.day}日`}
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
