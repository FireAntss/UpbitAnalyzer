# Fetch and Axois

> <https://www.meticulous.ai/blog/fetch-vs-axios>

> <https://velog.io/@eunbinn/Axios-vs-Fetch>

- 백엔드 또는 서드파티 API에 네트워크 요청이 필요한 상황에 유용한 HTTP 클라이언트. fetch와 aixos 모두 promise 기반의 HTTP 클라이언트라, resolve, reject가 가능한 promise를 반환한다.

## 기능 비교

### 문법

#### 1. `fetch(url, option)`

- 두 번째 인자로 `option`을 설정하지 않으면 기본으로 GET request를 생성한다.

```js
fetch(url);
```

- 아래와 같이 세부적인 설정도 가능하다.

```js
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});
```

#### 2. `axios(url, option)`

- `axios`도 `fetch`와 유사한 구조를 가지고 있는 것 처럼 보이지만, 다양한 방법으로 사용 가능하다.
- (마찬가지로 `option`을 설정하지 않으면 기본으로 GET request.)

```js
axios(url, {
  // options
});
```

```js
//HTTP method 붙여 사용하기
axios.get(url, {
  // options
});
```

```js
axios(url, {
  method: 'get'
  // options...
});
```

```js
axios({
  method: 'get',
  url: url,
  headers: {},
  data: {}
});
```

### JSON 데이터 처리

#### 1. `fetch`

```js
const url = 'https://jsonplaceholder.typicode.com/todos';

fetch(url)
  .then((response) => response.json())
  .then(console.log);
```

`fetch()` 는 `.then()` 메서드에서 처리된 promise 를 반환한다. 이는 json 데이터의 포맷이 아니기 때문에 `.json()` 메서드를 호출한다.

그러면 이는 json 형식의 데이터로 이행(resolve)된 또 다른 promise를 반환한다.

**따라서 일반적인 fetch 요청은 두개의 `.then()` 호출을 가지고 있다.**

#### 2. `axios`

```js
const url = 'https://jsonplaceholder.typicode.com/todos';

axios.get(url).then((res) => console.log(res.data));
```

`axios` 를 사용하면 응답 데이터를 기본적으로 json 형태로 불러올 수 있다. 응답 데이터는 언제나 응답 객체의 data 프로퍼티에서 찾을 수 있다.

아래와 같이 설정 옵션을 통해 responseType을 지정할 수도 있다.

```js
axios.get(url, {
  responseType: 'json' // options: 'arraybuffer', 'document', 'blob', 'text', 'stream'
});
```
