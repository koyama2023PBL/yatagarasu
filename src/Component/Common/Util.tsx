//Date型変換->[yyyymmddhhmmss]
export function getDate(date: Date) {
  let now = date;
  return "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) +
      padZero(now.getMinutes()) + padZero(now.getSeconds());
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

//String→Date型変換。
export function parseDateString (dateString: string): Date | null  {
  let year = 0, month = 0, day = 0, hours = 0, minutes = 0, seconds = 0;

  // 年月日のみの場合、年月日を取得
  if (dateString.length >= 8) {
    year = parseInt(dateString.slice(0, 4));
    month = parseInt(dateString.slice(4, 6));
    day = parseInt(dateString.slice(6, 8));
  }

  // 時間と分がある場合、それらを取得
  if (dateString.length >= 12) {
    hours = parseInt(dateString.slice(8, 10));
    minutes = parseInt(dateString.slice(10, 12));
  }

  // 秒がある場合、それを取得
  if (dateString.length === 14) {
    seconds = parseInt(dateString.slice(12, 14));
  }

  // 日時が有効かチェック
  if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
    // JavaScriptのDateは月が0から始まるため、月から1を引く
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  return null;
};

/*
//分以下切り捨て
export function truncateMinutes(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();

  return new Date(year, month, day, hours, 0, 0);
}
*/

//Unix時間をDate型に変換
export function unixTimeToDate(unixTime: number) {
  return new Date(unixTime * 1000);
}

//分以下丸め込み
export function roundMinutes(date: Date): Date {
  const coeff = 1000 * 60 * 5;
  return new Date(Math.floor(date.getTime() / coeff) * coeff);
  
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

//平均を算出するための関数
export function calcAverage(values: [number, string][]){
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += Number(values[i][1]);
  }
  return sum / values.length;
}

export function getRange(scrapeInterval: string): string {
  return scrapeInterval.replace(/\d+/g, (match) => {
    const num = parseInt(match, 10);
    return String(num * 2);
  });
}

export function calcSum(values: [number, string][]){
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += Number(values[i][1]);
  }
  return sum;
}
