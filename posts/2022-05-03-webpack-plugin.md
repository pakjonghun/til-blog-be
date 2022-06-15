---
date: 2022-05-03
category: webpack, plugin
---

## plugin

- plugins 플러그인 엄청 많다 [doc](https://webpack.js.org/plugins/)

- 단순 로더 외 더 많은 일을 할 수 있는 도구다. 이를테면 번들 사이즈 크기를 더 작게하거나 여러개로 나누어 번들링 하거나 등등.

### terserPlugin

-[doc](https://webpack.js.org/plugins/terser-webpack-plugin/)

- webpack 5 에서 기본으로 적용하고 있으나 실제 설치해서 사용하니 용량이 더 줄긴 했다
- 번들파일 용량이 많이 줄일 수 있다.
- terser-webpack-plugin

```
const TerserPlugin = require("terser-webpack-plugin");

plugins: [new TerserPlugin()],
```

### MiniCssExtractPlugin

- [doc](https://webpack.js.org/plugins/mini-css-extract-plugin/#root)
- css 파일을 별도로 분리 할 수 있다(이거 왜 하냐면 다이나믹 번들링 하려고 하는거다.)
- 파일이름을 설정 할 수도 있으며, 로더에 별도로 추가를 또 해줘야 한다.
- 또 이 파일을 별도로 html 에 포함해줘야 한다.

```
//임포트
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//로더에 추가 style-loader 대신 MiniCssExtractPlugin.loader 를 사용함.
{
  test: /\.scss$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
},

//plugin 에 추가
new MiniCssExtractPlugin({
  filename: "abc.css",
}),
```

## broswer caching

- 파일이름!! **이름** 을 캐슁해서 이름이 다른것만 다시 다운로드 함
- 이름은 파일 내용이 변경되었을때 발생함 웹팩에서(파일이름에 [contenthash] 추가하면됨.
- js css 등등 다 가능

```
filename: "bundle[contenthash].js",
 new MiniCssExtractPlugin({
      filename: "abc[contenthash].css",
    }),
```

## html-webpack-plugin

- [doc](https://webpack.js.org/plugins/html-webpack-plugin/#root)

- 위와 같이 파일명을 해쉬 해버리면 html 에서 읽을 수 있게 자동으로 script link 를 바꿔준다.
- public path 에서 dist 까지 없애고,
- 웹팩에 있는 html 파일만 있으면 되니까 root 에 html 까지 지우면 완벽하다

```
const HtmlWebpackPlugin = require("html-webpack-plugin");
//아래와 같이 타이틀이나 메타태그 심지어 파일 이 들어갈 폴더까지 커스텀 가능(폴더 지정해줄 경우 publicPath 수정이 필요함)
new HtmlWebpackPlugin({
  title: "origin",
  filename: "sub/iiinnndddeeexxx.html",
  meta: {
    description: "desc",
  },
}),

```

## clean-webpack-plugin

- [doc](https://www.npmjs.com/package/clean-webpack-plugin)
- 웹팩 다시 번들링 시 알아서 기존파일 삭제하는 플러그인
- 삭제할 파일명 패턴도 정해줄 수 있다.

```
//폴더 파일 싹다
new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ["**/*"],
}),

//위와 동일하지만 이런식으로 외부에 있는 폴더 파일도 없애 줄 수 있다.
new CleanWebpackPlugin({
  cleanOnceBeforeBuildPatterns: ["**/*", path.join(__dirname, "dist/**/*")],
}),
```
