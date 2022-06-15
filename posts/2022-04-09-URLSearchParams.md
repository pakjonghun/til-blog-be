---
date: 2022-04-09
category: url, URLSearchParams
---

## URLSearchParams

- javascript 에서 url 에 쿼리를 붙일때 사용하는 객체
- 띄어쓰기가 가끔 + 로 인식이 될때가 있고, 객체는 log 를 찍어봐도 변하지 않아서 toString 로 내용을 꺼내 봐야 확인 할수 있는 점이 불편했다.
- 하지만 함수로 만들어서 계속 돌려 썼는데 제법 편리했다.

```
export const makeUrl = (
  url: string,
  params: { [key: string]: string | number }
) => {
  const query = new URLSearchParams();

  for (const key of Object.keys(params)) {
    query.append(key, params[key] + "");
  }

  return `${url}?${query.toString()}`;
};

```
