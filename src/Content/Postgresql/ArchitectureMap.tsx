import React from 'react';
import { Paper, Box, Typography, Grid } from '@mui/material';

interface ArchitectureComponentProps {
  title: string;
  items: string[];
  bgColor: string;
}

const ArchitectureComponent: React.FC<ArchitectureComponentProps> = ({ title, items, bgColor }) => (
  <Paper style={{ padding: '16px', backgroundColor: bgColor }}>
    <Typography variant="h6">{title}</Typography>
    {items.map((item, index) => (
      <Typography key={index}>{item}</Typography>
    ))}
  </Paper>
);

const ArchitectureOverview: React.FC = () => {
  // 各セクションのアイテムを配列で定義
  const processItems: string[] = ['プロセスメモリ', 'work_mem', 'maintenance_work_mem', 'temp_buffers'];
  const sharedItems: string[] = ['共有メモリ', 'shared_buffers', 'wal_buffers', 'Free Scan Map', 'Visibility Map'];
  // 他のセクションも同様に...

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ArchitectureComponent title="PostgreSQLインスタンス" items={processItems} bgColor="#efdeff" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ArchitectureComponent title="ファイル" items={sharedItems} bgColor="#ffffdf" />
        </Grid>
        {/* 他のコンポーネントもGrid itemとして追加 */}
      </Grid>
    </Box>
  );
};

export default ArchitectureOverview;