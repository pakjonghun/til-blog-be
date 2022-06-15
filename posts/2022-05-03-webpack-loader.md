---
date: 2022-05-03
category: webpack, loader
---

## intro

- webpack 의 기능으로 별도로 패키지를 다운받아서 적용해주어야 한다.
- type 이 아닌 use 속성을 사용한다.

## Loader

- 로더는 asset 로 처리 안되는 확장자 처리용 이다.(css scss 등등)
- 로더는 asset 와 다르게 내장되어 있지 않으므로 별도로 설치 해줘야 한다.
- 로더는 use 속성을 사용한다.
- css 같은경우 일반적으로 우측 로더부터 실행되며

```
//css-loader 가 css 파일을 읽는 녀석이고
//style-loader 가 스타일을 적용하는 녀석이다.
{
  test: /\.css/,
  use: ["style-loader", "css-loader"],
},
```

```
//sass 사용 예시 왼쪽부터 sass로 css 로 변환하고 css를 다시 불러와서 스타일을 입혀준다 왼쪽부터 오늘쪽으로
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
},
```

- js 최신문법(아직 브라우저에서는 지원 안하는 것들)을 웹팩을 통해 파싱 시킬 수도 있다.

```
//use 안에 로더만 넣는 것이 아니라
//로더 에 옵션을 넣어주어하며 사용하는 플러그 인도 정해서 넣어 줄 수 있다.
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
  },
```
