import Taro, {useEffect, useShareAppMessage, useState} from '@tarojs/taro'
import {MSticky} from '../../../components'
import {pageUrls} from '..'
import {View} from '@tarojs/components'
import {XItem, XList, XNavigationBar, XTitle} from '../../components'

enum HeroType { 射手, 法师, 战士, 刺客 }

const heroList: { [K in HeroType]: string[] } = {
  [HeroType.射手]: ['鲁班七号', '后裔', '马可波罗', '孙尚香', '伽罗', '狄仁杰', '百里守约', '黄忠', '李元芳', '公孙离', '成吉思汗', '虞姬'],
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

export default function Sticky() {
  useShareAppMessage(() => ({
    title: 'Sticky',
    path: pageUrls.StickyIndex,
  }))

  const [localheroTypeList, setLocalheroTypeList] = useState<HeroType[]>([])
  useEffect(() => {
    setTimeout(() => {
      setLocalheroTypeList(heroTypeList)
    }, 100)
  }, [])

  // const [localheroTypeList] = useState<HeroType[]>(heroTypeList)

  return (
    <View>
      <XNavigationBar>Sticky</XNavigationBar>
      {localheroTypeList.map(heroType => (
        <View key={heroType}>
          <MSticky>
            <XTitle>
              {HeroType[heroType]}
            </XTitle>
          </MSticky>
          <XList>
            {heroList[heroType].map(hero => (
              <XItem
                key={hero}
                title={hero}
              />
            ))}
          </XList>
        </View>
      ))}
    </View>
  )
}
