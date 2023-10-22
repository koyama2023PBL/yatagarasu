import React from 'react';
import { green, yellow, red } from '@mui/material/colors';

//Date型変換->[yyyymmddhhmmss]
export function getDate(date: Date) {
  var now = date;
  var res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
      padZero(now.getMinutes()) + padZero(now.getSeconds());
  return res;
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

//Unix時間変換
export function getUnixTime(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

//分以下切り捨て
export function truncateMinutes(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  
  return new Date(year, month, day, hours, 0, 0);
}

//分以下丸め込み
export function roundMinutes(date: Date): Date {
  
  const coeff = 1000 * 60 * 5;
  const rounded = new Date(Math.floor(date.getTime() / coeff) * coeff);
  return rounded;
  
}

//小数点以下3桁丸め
export function roundToThreeDecimalPlaces(value: number): number {
  const factor = Math.pow(10, 3);
  return Math.round(value * factor) / factor;
}

//小数点以下2桁丸め
export function roundToTwoDecimalPlaces(value: number): number {
  const factor = Math.pow(10, 2);
  return Math.round(value * factor) / factor;
}

//先頭ゼロ付加
export function padZero(num: number) {
  return (num < 10 ? "0" : "") + num;
}

//MUIカラーポンポーネントをRGBへ変換
export function rgbToRgba(rgb: any, alpha: number) {
  return rgb.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
}

//APIレスポンスの基本形
export interface ApiResponse{
  data: ResponseData;
  status: string;
}

export interface ResponseData{
  resultType: string;
  result: ResponseResult[];
}

export interface ResponseResult{
  metric: ResponseMetric;
  values: [number, string][];
}

export interface ResponseMetric{
  __name__: string;
  datid: string;
  datname: string;
  instance: string;
  job: string;
}

export interface ApiRequest{
  query: string;
  start: number;
  end: number; 
  step: string;
}