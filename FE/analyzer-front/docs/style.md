# Style for React App

- [우리가 CSS-in-JS와 헤어지는 이유](https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EC%9A%B0%EB%A6%AC%EA%B0%80-css-in-js%EC%99%80-%ED%97%A4%EC%96%B4%EC%A7%80%EB%8A%94-%EC%9D%B4%EC%9C%A0-a2e726d6ace6)
- CSS Framework + SASS
  CSSinJS를 사용하는 대신 대표적인 CSS Framework인 Bootstrap을 사용하기로 함.
  참고: <https://haseeb-anwar.medium.com/react-with-sass-and-bootstrap-6eda9c61cd49>

```bash
npm i bootstrap
npm i -D sass-loader css-loader style-loader
```

```js
// webpack.config.ts
{
  ...
  rules: [
    {
      test: /\.scss$/,
      use: [
        'style-loader', // Step3. Injects common JS to DOM
        'css-loader',    // Step2. Turns CSS into common JS
        'sass-loader'   // Step1. Turns SASS into valid CSS
       ]
    }
  ]
  ...
}
```

```bash
your-app/
├── node_modules
├── package.json and other files
├── public
│   └── public files
└── src
    ├── scss
    │   └── _config.scss
    ├── App.scss
    ├── App.js
    ├── index.scss
    └── index.js
```

```scss
// _config.scss
$body-color: yellow;
$primary: yellow;
```

```scss
// App.scss
// include customized bootstrap
@import './scss/config';
// include all of Bootstrap
@import 'bootstrap/scss/bootstrap';
// define or include your other css below
.App {
  height: 100vh;
}
```

```bash
npm i react-bootstrap
```

```js
// App.js
import Button from 'react-bootstrap/Button';
return <Button variant="primary">Yellow primary button</Button>;
```
