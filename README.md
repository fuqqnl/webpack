## webpack 使用方法

webpack 跟gulp的原理其实是一样的，webpack通过react的大热又火了起来，所以，我们是有必要学习一下滴。下面我就把webpack经常用的知识写下来。

## 几个经常用的插件

### html-webpack-plugin

```js
new htmlWebpackPlugin({
    template: path.resolve(ROOT_PATH, 'index.html'),
    filename: 'index.html',
    inject: 'body'
})
```

这个插件的作用是动态的生成一个html，同时会把其中依赖的css、js动态的添加到html中，比较方便。以前的做法，是我们确定了css、js的名称后，手动的根据路径来加在html中。这个插件省了手动添加的时间。

### extract-text-webpack-plugin

这个插件的作用是把分散的css提取到一个文件中，后面会有它的用法

```js
new ExtractTextPlugin('style.css', {allChunks: true} )
```
意思是把所有的分散的css提取到一个叫style的css中

### open-browser-webpack-plugin

```js
new OpenBrowserPlugin({url: 'http://localhost:8081/'})
```
这个插件的作用是自动启动页面，并且页面的url就是我们定义的，这样让又节省了我们一部分时间。

## 重要的属性

### entry 

这个属性定义文件的入口

```js
entry: [
    'webpack/hot/dev-server',
    path.resolve(APP_PATH,'main.js')
]
```
上面的意思是，在开始执行的时候执行文件热重载功能，并且确定文件的入口是main.js

### output

```js
output: {
    path: BUILT_PATH,
    filename: '[name].[hash:6].js'
},
```
output 是js文件产出路径,[name].[hash:6] 的意思是，文件中的js叫什么名，产出的也叫什么名，并且加上了哈希值，设定hash的位数是6位。当然，长点短点都是可以的。

### module

定义模块，其中重要的是 loaders（加载器）

```js
module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {presets: ['es2015','react']}
        },
        {
            test: /\.jsx$/,
            loader: 'babel',
            query: {presets: ['es2015','react']}
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader','css-loader')
        },
        {
            test: /\.less$/,
            loader: 'style!css!less?sourceMap'
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url?limit=8192'
        }
    ]
}
```

介绍上面写的加载器。第一个babel是转换es6语法的，test是指对哪个类型的进行处理；exclude是指哪个类型或者文件不需要进行处理;query是指将es2015和react中的语法进行编译成浏览器能够识别的。

第3个是style-loader和css-loader。 style-loader的作用是将css插入到页面的style标签，css-loader是处理css文件中的url()等。loader的加载顺序是从右向左的，所以放的顺序有要求。
 
 第4个是处理less文件的。style!css!less的 ！是‘和’的意思

 第5个是处理图片的，url-loader的作用是将小于某个值得图片转成base64 。比如这个例子是将小于8k上面类型的图片转成base64


### babel

```js
babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
}
```

这里是对babel进行了针对性的处理，其中的transform-runtime插件的作用是 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；


当然这里只是解释了我在项目中用到的这些比较常用的部分，希望能对大家有所帮助。

webpack里面我们用的所有的插件、程序，是需要用npm安装的。这些都在对应的package.json里

这里着重说一下package里的scripts

```js
"scripts": {
    "start": "webpack-dev-server --hot --inline --port 8081 --config webpack.config.base.js",
    "build": "webpack --progress --profile --colors --config webpack.config.base.js"
}
```

当我们在命令行中执行 npm run start时，实际上就是执行了这里。


