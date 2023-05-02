# <img src="./docs/src/UPbit_Logo.png" width="100px"> Analyzer <img src="./docs/src/rocket_1f680.png" width="32">
test
> ⚠️ 현재 작성 중 입니다.

- [프로젝트 개요](./docs/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EA%B0%9C%EC%9A%94.md)

---
<details>
<summary><h2><img src="./docs/src/smiling-face-with-sunglasses_1f60e.png" width="24"> Team</h2></summary>
<table width="80%">
<tr><th>강유현</th><th>오세훈</th><th>조영일</th></tr>
<tr align="center"><td>Team Leader/BE</td><td>DA/BE</td><td>FE/BE</td></tr>
<tr><td><img src="https://avatars.githubusercontent.com/u/122770678?v=4"></td><td><img src="https://avatars.githubusercontent.com/u/122770694?v=4"></td><td><img src="https://avatars.githubusercontent.com/u/122770896?v=4"></td></tr>
</table>
</details>

## Repository Directory Construction
```bash
.
├── /BE
├── /DA
├── /docs
│   └── /src
└── /FE
```
- `/BE` : 백엔드, 인증 및 권한 그리고 API 관련
- `/DA` : 데이터 분석
- `/docs` : 공유 문서
- `/FE` : 프론트엔드, 사용자 입력 및 시각화 관련

## 실행

1. DA 서비스 실행
```
$ python app.py
```
2. BE 서비스 실행
```
$
```
3. FE 서비스 실행
```
$
```

## 세부사항

- DA, `localhost:5000/api/prediction`
    - HTTP 중에서 POST만 제공
- BE, `localhost:8080/api/...`
    - 권한(profile)
    - 인증(login)
    - API(user, history)
    - ...
- FE, `localhost:3000`
    - ...

## <img src="./docs/src/UPbit_Logo.png" width="100px"> 코인 분석 도구
가상자산 시장에서 코인의 지표 데이터를 분석하여 가격을 예측하고 방향성(상승, 하락)에 대한 확률을 계산하여 퀀트 전략 알고리즘의 기본 토대를 만드는 것을 목표로 한다.

최근 가상자산 시장의 급격한 성장으로 인해 많은 개인 투자자들이 가상자산에 대한 투자를 시도하고 있지만, 전문적인 지식과 정보 부족으로 인해 많은 투자 실패 사례가 발생하고 있다. 이에 본 프로젝트는 가상자산 시장에 대한 접근성을 높이고, 지표 분석과 예측 즉, 딥러닝 솔루션 중 CNN과 LSTM을 활용하여 코인의 지표 데이터를 분석하고 예측 모델을 구축함으로 가상자산에 대한 투자에 대한 전문성과 정보를 제공할 것이다. 

이를 통해, 시장에서 일어나는 변화와 흐름을 더 정확하게 파악하고, 이를 기반으로 퀀트 전략 알고리즘을 만들어 높은 수익률을 도출할 것이다.

## Feature
- 회원
    - 소셜 로그인
    - 권한 설정
    - (opt) : 계좌 정보
- 1시간, 4시간, 24시간 업 다운 예측
## Getting Started



## Licence
<a rel="license" href="https://mit-license.org/"><img alt="MIT Licence 2023" style="border-width:0" src="https://img.shields.io/badge/license-MIT Licence -lightgrey" /></a><br/>
Upbit Analyzer is licenced under *MIT Licences*
```
The MIT License (MIT)

Copyright (c) 2015 SuHun Han

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
