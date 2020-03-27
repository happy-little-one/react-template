**除了公共和顶层模块，并无强制用 ts，你可以自由选择**

## 已封装

### 组件

- AppTable 表格组件，基于 useList 封装了大部分业务场景(搜索+翻页， 搜索+不翻页，无搜索+翻页，无搜索+无翻页)
- Detail 详情组件，安设规范实现，传入 items 即可
- ModalForm 弹窗表单，用法类似 Modal.info
- Search 搜索组件，传入 schema 和 onSubmit 即可。
- SingleUpload 单个上传组件
- form 控件
  - NumberRange 数字范围组件，formily type 为 'number-range'
  - AutoInput 异步自动完成组件，通常会基于它封装特定的组件(如 OrgInput)，所以没有 connect
  - VerifyCode 验证码组件，formily type 为 'verify-code'

### hooks

- useList 由于已经封装了 AppTable,这里可用于非表格场景(如自定义 UI 的列表)

### 方法

- http, 基于业务的 axios 的无损封装
- fenToYuan 分转换为元
- clearObj 返回一个没有无效属性的干净对象。
- downloadFromApi 通过接口下载文件
- downloadFile 通过文件连接下载文件

### 常量

- IS_DEV 是否为开发环境
- BASE_URL 网站 baseUrl

## 开发

- 优先使用 chrome 非安全模式，而不是代理
- http post 默认为 json type，如果接口不规范，要传 form 格式，一般情况直接传 params 即可，http({ method: 'post', params })
- 项目为模板项目，**新项目需要根据后端数据返回格式进行一些手动修改**，具体为：
  - common/hooks/useList 修改 formatResponse 和 pageKey 的默认值
  - types 修改接口定义

## 文件规范

- 文件、文件夹用小写中划线命名
- 组件用 tsx、jsx 结尾，这样一眼就可以看出那些是组件
- 页面文件在 pages 下，命名必须和路由保持一致
- 动态路由对应页面用 $param 命名，如详情页 $id.tsx

## 编码规范

编码规范用[ts 开发团队规范](http://caibaojian.com/typescript/doc/wiki/coding_guidelines.html),这里列几个重要的点：

- 不要使用 I 做为接口名前缀
- 使用 undefined，不要使用 null
- 共享的类型应该在 types.ts 里定义
- **公共函数和组件注释必须用多行注释格式，这样在代码提示里就可以看到注释**

## css

- 工具库用[tailwindcss](https://www.tailwindcss.cn/)，几乎涵盖所有 css，支持伪类和伪选择器。
- tailwind 官网顶部有个搜索框，直接输入属性就可查到样式定义，非常方便
- 请尽量使用 tailwind 内置样式，它们都是根据规范定制过的，这样保证你所有的样式都在规范内，别人也更好维护
- 如果一定要写 css，请使用 less+module

## 工具库

- 表单方案用[formily](https://formilyjs.org/#/L3TOTn/7zs3sJUW),目前看来最好用的表单方案

- 工具库用[ramda](https://ramda.cn/docs/)(左侧搜索栏可以方便的作检索，输入 list 试试)，它比 lodash 设计的更为合理，[具体看这篇文章](http://www.ruanyifeng.com/blog/2017/03/ramda.html)

- 时间工具用 dayjs

## 打包

- 测试环境和开发环境都为 npm run build
- 启用了缓存插件，首次启动后速度会变得很快，装新包后如遇问题，删除 node_modules 下.cache 文件夹试试
