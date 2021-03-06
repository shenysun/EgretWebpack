# egret使用webpack 编译模式


## HOW TO RUN
#### 安装环境：
`npm install`

#### 启动：
`npm run start`


========================================================================

## 1. egret项目转换为es6
- 安装egret项目转换es6的库`npm install @egret/convert-egret-project-to-es6 -g`
- 配置package.json, 参数分别是egret的项目和es6输出文件夹
    ```json
    "scripts": {
        "convert": "convert-egret convert ./ ./dist",
    }
    ```
- libs和src目录替换dist目录下的同名文件夹, 做好备份
- 使用`tsc --noEmit`检测报错

## 2. 摒弃egret旧的编译模式

### 取代manifest.json
删除manifest.json文件,并将initial里面的文件目录加到HtmlWebpackPlugin中的libScripts的参数中
```javascript
new HtmlWebpackPlugin({
        title: 'egret webpack',
        template: path.resolve(__dirname, './index.html'),
        libScripts: [
            "libs/modules/egret/egret.js",
            "libs/modules/egret/egret.web.js",
            "libs/modules/eui/eui.js",
            "libs/modules/assetsmanager/assetsmanager.js",
            "libs/modules/tween/tween.js",
            "libs/modules/promise/promise.js"
        ],
        bundleScripts: ["/bundle.js"]
    }),
```
## 3. 修改index.html取代旧的加载方式
在html文件中通过如下方式拿到title参数
```html
<%= htmlWebpackPlugin.options.title %>
```
也可通过forEach遍历数组参数
```html
<% htmlWebpackPlugin.options.libScripts.forEach(function(script){%>
<script src="<%=script %>"></script>
<% }) %>
``` 
修改结果见[index.html](./index.html)

## 4. 使用船新命令
使用`npm run build`和`npm run start`代替`egret build`和`egret run`命令

## 5. warning
`npm run start`跑起来项目会发现报"找不到Egret入口类: Main"
这是因为旧的egret项目每个类都会挂载在全局对象上, `egret.runEgret`
方法里的`egret.getDefinitionByName`可以找,而export其自身的作用域里执行，而不是在全局作用域里。

[参考TypeScript官方文档](https://www.tslang.cn/docs/handbook/modules.html#export)
    
### 解决方案
可以在Main.ts的底部加上`window['Main'] = Main;`解决此问题.

不足: 如果项目中其他位置还有使用`getDefinitionByName`方法的,需要每个文件都加上这句话,加大工作量

### 增加一键编译调试

在vs调试项选择 Launch Chrome 之后可使用F5一键编译调试

[在VSCode中调试webpack-dev-server项目](https://zhuanlan.zhihu.com/p/106793313)

