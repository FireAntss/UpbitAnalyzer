# Analyzer

> 🔥 작업 중...
> https://youtu.be/0sY4fUi5dMM?t=1247

## TODO

- [ ] React 개발 문서 작성
  - [ ] 컴포넌트 > 페이지 > 레이아웃 설명
  - [ ] `/utils` 내 `fetcher`, `debounce` 개념 설명
  - [ ] `/store` 개념 설명
  - [ ] `/hooks` 설명
- [ ] API 변경: CoinGecko -> Upbit

1. 개요
2. 요구사항
3. 분석
4. 설계
5. 구현
6. 평가 및 테스트
7. 일정계획

## Settings

- [1. Create React App](#1-create-react-app)
- [2. Coding Style](#2-coding-style)
- [3. Code Splitting](#3-code-splitting)

### 1. Create React App

- ~~CRA + typescrtip + craco~~
- ~~CRA + typescript + react-app-rewired~~
  > <https://codingbeautydev.com/blog/create-react-app-alternatives/>
- **Create React App without CRA**

> <https://velog.io/@ziyoonee/React-with-TS-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0>

프로젝트 설정을 마치면 위 링크와 같이 정리.

1. NPM

   ```bash
   npm init -y
   ```

2. React

   ```bash
   npm i react react-dom react-router-dom
   ```

   - 프로젝트 기본 파일 `index.html`, `index.tsx`, `App.tsx` 생성

3. TypeScript

   ```bash
   npm i -D typescript ts-node @types/react @types/react-dom @types/react-router-dom
   ```

   ```bash
   npx tsc --init
   ```

   - `tsconfig.json` 생성
   - `"outDir": "./dist"`

4. Babel

   ```bash
   npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
   ```

   - `babel.config.js` 생성

5. Webpack

   ```bash
   npm i -D webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin ts-loader
   ```

   - `webpack-dev-server`: 실시간 컴파일, 리로드 지원
   - `webpack-merge`: dev, prod 모드로 지원
   - `html-webpack-plugin`: html 템플릿 생성 지원
   - `ts-loader`: ts to js

   ```json
   ...
   "script": {
       "dev": "webpack-dev-server --config webpack.config.ts --open --hot",
       "build": "webpack --config webpack.config.ts NODE_ENV=production webpack"
   }
   ...
   ```

6. 절대 경로 설정

### 2. coding style

- ESLint + Prettier

  ```bash
  npm -i -D eslint
  npx eslint --init
  ```

### 3. Code Splitting

- CSS in JS : `@emotion`

## 유용한 링크

- <https://mingmeng030.tistory.com/266>
- <https://github.com/hch0821/SpringBootReactApp>
