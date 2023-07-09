import { Card, CardContent, Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';

// データを取得するための関数の型
type FetchFunction<Data> = () => Promise<Data>;

// DataBoxのプロパティの型定義
interface DataBoxProps<Data> {
  title: string; // タイトル
  fetchFunction: FetchFunction<Data>; // データ取得関数
  renderFunction: (data: Data) => ReactElement; // データレンダリング関数
}

// DataBoxコンポーネント
const DataBox = <Data,>({ title, fetchFunction, renderFunction }: DataBoxProps<Data>) => {

  const [data, setData] = useState<Data | null>(null);

  // データの取得
  useEffect(() => {
    fetchFunction().then(setData);
  }, [fetchFunction]);

  // レンダリング
  return (
    <Card sx={{ p: 2 }}>
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="h6" component="div" textAlign={"left"} sx={{ paddingTop: 0 }}>
          {title}
        </Typography>
        {data ? renderFunction(data) : 'Loading...'}
      </CardContent>
    </Card>
  );
};

export default DataBox;
