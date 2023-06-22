# debounce

debounce는 특정 시간동안 같은 함수가 연속해서 실행될 경우 마지막 함수 실행 이후 일정 시간이 지나기 전에는 다시 함수가 실행되지 않도록 하는 기능.

```js
// debounce.ts
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
```

함수의 첫 번째 인자로는 함수를, 두번쨰 인자로는 딜레이 시간을 받는다. 반환 값으로는 인자로 받은 함수를 감싼 새로운 함수를 반환한다. 반환된 함수를 실행하면 내부적으로는 setTimeout을 사용하여 함수를 실행한다.

반환된 함수는 내부적으로 setTimeout 함수를 사용해 딜레이 시간 이후에 인자로 받은 함수를 실행한다. 만약, 이전에 실행한 setTimeout이 아직 실행되지 않은 경우, 이전의 setTimeout을 취소하고 새로운 setTimeout을 실행한다.

> 이러한 debounce 함수는 인자로 받은 함수가 연속해서 호출되더라도 일정 시간 이내에는 실제 함수가 실행되지 않도록 제어한다.
