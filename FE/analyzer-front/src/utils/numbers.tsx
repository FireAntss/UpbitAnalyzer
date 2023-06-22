import React from 'react';
export function numberWithCommas(num: number | undefined) {
  if (num === undefined) {
    return ''; // num이 undefined인 경우 빈 문자열 반환
  }

  let roundedNum = num.toFixed(8); // 반올림하여 8자리까지 표시
  let parts = roundedNum.toString().split('.');

  // 정수부분에 콤마 추가
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // 소수부분에서 불필요한 0 제거
  if (parts[1]) {
    parts[1] = parts[1].replace(/0+$/, '');
    if (parts[1] === '') {
      // 소수부분이 모두 0인 경우 제거
      parts.pop();
    }
  }

  return parts.join('.');
}

export function formattedTimestamp(date: string): string {
  return new Date(date).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

export function setStringNumber(num: number) {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(0) + 'T';
  } else if (num >= 1_000_000_000) {
    return (
      <>
        {parseFloat((num / 1_000_000_000).toFixed(3))}
        <strong>M</strong>
      </>
    );
  } else if (num >= 1_000_000) {
    return (
      <>
        {parseFloat((num / 1_000_000).toFixed(0))}
        <strong>M</strong>
      </>
    );
  } else if (num > 1_000) {
    return (
      <>
        {parseFloat((num / 1_000).toFixed(0))}
        <strong>K</strong>
      </>
    );
  } else if (num >= 100) {
    return parseFloat(num.toFixed(2));
  }
}

export function setNumComma(num: number) {
  const parts = num.toFixed(2).split('.');
  return Number(parts[0]).toLocaleString('ko-KR') + (parts[1] !== '00' ? '.' + parts[1] : '');
}
export function setNumCommaBeak(num: number) {
  return (num / 1_000_000).toLocaleString('ko-KR');
}
