---
date: 2022-05-03
category: webpack, spliting
---

## Multi page(파일) 분할 방법

```
//엔트리가 여러개 가 될수 있다 멀티 페이지 일 경우
//이때 각 key 값이 output의 [name]이 된다.
entry: {
    hellow: "./src/index.js",
    img: "./src/index2.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: "",
  },
```

- css 분할도 마찬가지다.

```
new MiniCssExtractPlugin({
  filename: "[name].[contenthash].css",
}),
```

- 분할 html 은 아예 htmlplugin 객체를 필요한 만큼 만들면 된다.

```
//이름 과 청크(포할될 js 번들 이름<-- 이건 변수가 아니라 "string" 이 되야하며 entry name 과 동일 해야 한다.>, 등이 포함되면 된다.)
new HtmlWebpackPlugin({
  title: "origin2",
  chunks: ["index2"],
  filename: "sub/index.html",
  meta: {
    description: "desc2",
  },
  minify: false,
}),
```

## optimization 라이브러리 사용시 최적화 방법

- 라이브러리를 그냥 사용하고 아무 설정 안하면 모든 번들링 파일에 라이브러리가 포함된다. 비효율적
- 아래 설정 하면 라이브러리는 별도 번들링 되어 캐슁되어 재활용 된다. 개 효율
- 아래 설정을 하면 html 파일 에 꼭 필요한 곳에만 script(라이브러리 연결)이 생성된다.
- 아래 옵션은 30kb 초과시에만 공통 종속성을 추출한다. 하지만 minSize 로 변경 할 수도 있다.

```
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize:1024*3   //3kb 너머갈때만 공통 의존성으로 추출한다.
    },
  },
```
