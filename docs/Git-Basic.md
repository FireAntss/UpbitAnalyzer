# Git Basicwq

### 초기화

```bash
git init
```

### 사용자 설정

```bash
git config --global user.name "{username}"
git config --global user.email {user@email.com}
```

```bash
git config user.name "{username}"
git config user.email {user@email.com}
```

### 커밋 정보 확인

```bash
git log
```

### 변경 내용 비교

Repository - Working Directory 차이 확인

```bash
git diff
```

위 명령어는 현재 작업 진행 중인 파일의 이전 커밋 상태를 확인할 때 쓰고, 평소에는 vscode의 사이드바, Github Desktop또는 GitLens 에서 시각적으로 확인하는 것을 추천.

## 브랜치

### 브랜치 생성

```bash
git branch newbranch from // from 브랜치로부터 newbranch를 생성
```

### 브랜치 이동

```bash
git checkout -b utility // -b 옵션을 주면 utility 브랜치를 생성하고 이동한다.
```

### 브랜치 이름 변경

```bash
git branch -m from newbranch //from 브랜치의 이름을 newbranch로 변경
```

## 브랜치 변경 내용 반영(remote -> local)
```bash
git fetch
git pull # 원격지 변경사항을 로컬에 적용
```