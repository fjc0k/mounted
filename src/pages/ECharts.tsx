import './ECharts.scss'
import Taro, { Config, ShareAppMessageReturn } from '@tarojs/taro'
import { component } from '../components/component'
import { MECharts } from '../components'
import { pageUrls } from '.'
import { View } from '@tarojs/components'
import { XBackHome, XItem, XList, XTitle } from './components'

const getECharts = () => require('echarts/dist/echarts.min.js')

export default class ECharts extends component({
  disableGlobalClass: true,
  state: {
    selectedCountryIndex: 0,
  },
}) {
  config: Config = {
    navigationBarTitleText: 'ECharts',
  }

  onShareAppMessage(): ShareAppMessageReturn {
    return {
      title: 'ECharts',
      path: pageUrls.ECharts,
    }
  }

  render() {
    return (
      <View>
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

        <XTitle>饼图</XTitle>
        <XList>
          <XItem>
            <MECharts
              getECharts={getECharts}
              className='chart'
              options={pieOptions}
            />
          </XItem>
        </XList>
        <XBackHome />
      </View>
    )
  }
}

const radarOptions: MECharts['props']['options'] = {
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

const pieOptions: MECharts['props']['options'] = {
  backgroundColor: '#ffffff',
  color: ['#5BA2BE', '#45B3C0', '#3DC3BB', '#4DD2AF', '#6EDF9E', '#95EA8C'],
  series: [
    {
      label: {
        normal: {
          fontSize: 14,
        },
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '北京',
      }, {
        value: 20,
        name: '武汉',
      }, {
        value: 10,
        name: '杭州',
      }, {
        value: 20,
        name: '广州',
      }, {
        value: 38,
        name: '上海',
      } ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)',
        },
      },
    },
  ],
}
