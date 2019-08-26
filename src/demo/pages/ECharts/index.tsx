import './index.scss'
import Taro, { useShareAppMessage } from '@tarojs/taro'
import { MECharts, MEChartsProps } from '../../../components'
import { pageUrls } from '..'
import { View } from '@tarojs/components'
import { XItem, XList, XNavigationBar, XTitle } from '../../components'

const getECharts = () => require('echarts/dist/echarts.min.js')

export default function ECharts() {
  useShareAppMessage(() => ({
    title: 'ECharts',
    path: pageUrls.EChartsIndex,
  }))

  return (
    <View>
      <XNavigationBar>ECharts</XNavigationBar>
      <XTitle>雷达图</XTitle>
      <XList>
        <XItem>
          <MECharts
            getECharts={getECharts}
            className='chart'
            disableTouch={true}
            options={radarOptions}
          />
        </XItem>
      </XList>
    </View>
  )
}

const radarOptions: MEChartsProps['options'] = {
  backgroundColor: '#ffffff',
  color: ['#1AAD19'],
  xAxis: {
    show: false,
  },
  yAxis: {
    show: false,
  },
  radar: {
    splitNumber: 4,
    splitLine: {
      lineStyle: {
        color: '#999999',
        opacity: 0.4,
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#999999',
        opacity: 0.4,
      },
    },
    indicator: [{
      name: '听',
      max: 500,
    },
    {
      name: '说',
      max: 500,
    },
    {
      name: '读',
      max: 500,
    },
    {
      name: '写',
      max: 500,
    },
    {
      name: '唱',
      max: 500,
    },
    {
      name: '跳',
      max: 500,
    } ],
  },
  series: [{
    name: '能力',
    type: 'radar',
    data: [{
      value: [430, 340, 500, 300, 490, 400],
      name: '能力值',
    }],
    areaStyle: {
      opacity: 0.3,
    },
  }],
}
