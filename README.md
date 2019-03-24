<p align="center">
  <img src="https://raw.githubusercontent.com/fjc0k/mounted/master/assets/logo.png" width="150" />
</p>

# Mounted

一款基于 [Taro](https://github.com/NervJS/taro) 的小程序组件库。

## 特性

- 使用 **TypeScript** 编写
- 专注 **小程序**
- 只产出与业务低耦合的 **基础组件**
- 支持 **自定义主题**

## 使用

首先，使用以下命令安装：

```bash
# yarn
yarn add mounted

# 或者，npm
npm i mounted --save
```

然后，在 `app.scss` 中引入组件样式：

> 若你未使用 `scss`，请在 `app.js` 同级目录新建 `app.scss`，并在 `app.js` 中引入：`import './app.scss'`。

```scss
@import '~mounted/src/styles/components.scss';
```

最后，在页面中按需引入组件：

```js
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { MSticky } from 'mounted'

export default class Demo extends Taro.Component {
  render() {
    return (
      <View>
        <MSticky>
          <View className='title'>
            <Text>标题</Text>
          </View>
        </MSticky>
      </View>
    )
  }
}
```

## 自定义主题

若需自定义主题，直接在 `app.scss` 中覆盖变量即可，如：

```scss
// 主色调
$primaryColor: #1AAD19;

@import '~mounted/src/styles/components.scss';
```

> 组件库所使用的样式变量都在 [src/styles/settings.scss](./src/styles/settings.scss) 文件内。

## 设计稿尺寸

组件库内部采用的是 `375` 尺寸，若你的项目也是基于 `375` 的，可跳过。

若你的项目是基于其他尺寸，比如 `750` 的，请在 `app.scss` 中覆盖设计稿尺寸变量：

```scss
// 设计稿尺寸
$designWidth: 750;

@import '~mounted/src/styles/components.scss';
```

## 组件列表

下面列出 `mounted` 包含的组件，点击相应组件名称进入可查看其 **~~文档~~** 代码：

- [Picker - 选择器](./src/components/Picker/index.tsx#L8)
- [PickerView - 选择器视图](./src/components/PickerView/index.tsx#L40)
- [Popup - 弹出层](./src/components/Popup/index.tsx#L19)
- [SinglePicker - 单项选择器](./src/components/SinglePicker/index.tsx#L10)
- [Sticky - 内容吸顶](./src/components/Sticky/index.tsx#L9)
- [Transition - 动画过渡](./src/components/Transition/index.tsx#L14)

## 许可

MIT © Jay Fong
