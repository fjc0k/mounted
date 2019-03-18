import { View } from '@tarojs/components'
import { Config } from '@tarojs/taro'
import { component } from '../components/component'
import { MSticky } from '../components'
import { XTitle, XList, XItem } from './components'

enum HeroType { 射手, 法师, 战士, 刺客 }

const heroList: { [K in HeroType]: string[] } = {
  [HeroType.射手]: ['鲁班七号', '后裔', '马可波罗', '孙尚香', '伽罗', '狄仁杰', '百里守约'],
  [HeroType.法师]: ['安琪拉', '诸葛亮', '上官婉儿', '嫦娥', '张良', '小乔', '墨子', '不知火舞'],
  [HeroType.战士]: ['典韦', '赵云', '达摩', '花木兰', '关羽', '亚瑟', '橘右京', '盘古'],
  [HeroType.刺客]: ['阿珂', '孙悟空', '兰陵王', '李白', '韩信', '百里玄策'],
}

const heroTypeList: HeroType[] = [
  HeroType.射手,
  HeroType.法师,
  HeroType.战士,
  HeroType.刺客,
]

export default class Sticky extends component() {
  config: Config = {
    navigationBarTitleText: 'Sticky',
  }

  render() {
    return (
      <View>
        {heroTypeList.map(heroType => (
          <View key={heroType}>
            <MSticky>
              <XTitle>{HeroType[heroType]}</XTitle>
            </MSticky>
            <XList>
              {heroList[heroType].map(hero => (
                <XItem key={hero} title={hero} />
              ))}
            </XList>
          </View>
        ))}
      </View>
    )
  }
}
