import * as React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import SvgExploreComponentHome from '../../SVGs/ReactComponent/Components/ExploreComponentHome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Component/Redux/StateStore';
import Catalog from './PostgresFiles/Catalog';
import Index from './PostgresFiles/Index';
import Others from './PostgresFiles/Others';
import Table from './PostgresFiles/Table';
import WAL from './PostgresFiles/WAL';
import Postmaster from './PostgresProcess/Postmaster';
import SharedBuffers from './PostgresProcess/SharedBuffers';
import BackgroundWriter from './PostgresProcess/BackgroundWriter';
import WALWriter from './PostgresProcess/WALWriter';
import Autovacuum from './PostgresProcess/Autovacuum';
import Checkpointer from './PostgresProcess/Checkpointer';
import StatsCollector from './PostgresProcess/StatsCollector';
import Archiver from './PostgresProcess/Archiver';
import SvgExploreComponentPostgresprocess from '../../SVGs/ReactComponent/Components/ExploreComponentPostgresprocess';

const steps = [
  { step: "table", description: "1. テーブルファイル" },
  { step: "index", description: "2. インデックスファイル" },
  { step: "catalog", description: "3. カタログ" },
  { step: "wal", description: "4. WAL" },
  { step: "other", description: "5. その他の主要ファイル" },
];

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const ComponentPostgresProcess: React.FC = () => { 
  const parseRef = React.createRef<HTMLDivElement>();

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: string) => {
      scrollToRef(parseRef);
  };

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);


  return (
    <Box>
      <Box sx={{ display: 'flex'}}>
        <Card sx={{ flex: 1, width: '45%'}}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" gutterBottom>
                PostgreSQLを構成するプロセス群
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: '1.5', marginLeft: '1vw'}}>
              <SvgExploreComponentPostgresprocess/>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '55%', marginLeft: '5pt' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              PostgreSQLの構成プロセス
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              PostgreSQLはOS上にて複数のプロセス群で稼働します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              Postmasterプロセスが最上位のプロセスとして稼働し、PostgreSQLの稼働に必要なプロセスを管理します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              PostmasterがPostgreSQLをクラスタとして動作させるために必要なプロセスをコントロールします。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              OS上のプロセスとして各機能を実行することで、スケーラビリティに優れた構成になっています。
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <div ref={parseRef} id="table">
        <Box sx={{marginTop: "6pt"}}>
            <Postmaster starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="index">
        <Box sx={{marginTop: "6pt"}}>
            <SharedBuffers starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-process">
        <Box sx={{marginTop: "6pt"}}>
            <BackgroundWriter starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-process">
        <Box sx={{marginTop: "6pt"}}>
            <StatsCollector starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-memory">
        <Box sx={{marginTop: "6pt"}}>
            <WALWriter starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-memory">
        <Box sx={{marginTop: "6pt"}}>
            <Checkpointer starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-process">
        <Box sx={{marginTop: "6pt"}}>
            <Autovacuum starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-memory">
        <Box sx={{marginTop: "6pt"}}>
            <Archiver starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
    </Box>
  );
};

export default ComponentPostgresProcess;
