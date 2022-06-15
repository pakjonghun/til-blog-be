---
date: 2022-05-03
category: webpack, mode
---

## mode

- 각 모드에 맞는 최적화를 제공한다(4 부터 사용가능)
- production|development|none
- 자동으로 dotenv 사용가능
- 각 모드별 config 파일을 따로 만든 다음에 스크립트로 관리 할 수 있다.

```
"build": "webpack --config webpack.production.config.js",
"dev": "webpack --config webpack.development.config.js"
```

### production

- producton 모드는 오류 발생시 어디서 오류 떳는지 알기 힘든다(번들링 되서 압축 되 있어서 그렇다)
- production 모드에서는 terserplugin 이 포함되어 있다.

## development

- 디버깅이 쉽다 source-map
- broswer-caching 할 필요가 없다.
- 역시 terserplugin 은 굳이 쓸 필요가 없다.
- 그러면 파일을 굳이 나눌 필요도 없다.(extrace css 없어도 됨.)

## dev-server

- development 에서 이용할 개발용 서버
- static path 를 주면 그 안에 있는 index.html 을 자동으로 읽고 다른 것을 읽도록 커스텀도 가능하나
- script 나 link 의 경우 경로가 하위 경로 여야 읽어 진다.

```
devServer: {
    static: {
      //html 파일 있는 폴더를 가르키면 여기서 script 하고 다 읽는다
      //절대경로 이며, output path 를 넣으면 됨.
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      index: "abc.html",
      //말그대로 캐슁 하지 않고 디스크에 쓴다는 이야기 이거 해 놔야 혼란이 없다고 설명을 들음.
      writeToDisk: true,
    },
    port: 9000,
  },


//script 핫 리로디드도 알아서 된다. --hot
"dev": "webpack serve --config webpack.development.config.js --hot"
```
