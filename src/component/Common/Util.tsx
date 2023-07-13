import React from 'react';

//Date型変換->[yyyymmddhhmmss]
export function getDate(date: Date) {
  var now = date;
  var res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
      padZero(now.getMinutes()) + padZero(now.getSeconds());
  return res;
}

//先頭ゼロ付加
export function padZero(num: number) {
  return (num < 10 ? "0" : "") + num;
}

//Date型変換->[YYYY/MM/DD HH:mm:SS]
export function DateTostring(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

//小数点以下3桁丸め
export function roundToThreeDecimalPlaces(value: number): number {
  const factor = Math.pow(10, 3);
  return Math.round(value * factor) / factor;
}