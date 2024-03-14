import * as React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Component/Redux/StateStore';
import Catalog from './PostgresFiles/Catalog';
import Index from './PostgresFiles/Index';
import Others from './PostgresFiles/Others';
import Table from './PostgresFiles/Table';
import WAL from './PostgresFiles/WAL';
import SvgExploreComponentFiles from '../../SVGs/ReactComponent/Components/ExploreComponentFiles';

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const ComponentPostgresFile: React.FC = () => { 
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
                PostgreSQLが使用するファイル
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: '1.5', marginLeft: '1vw'}}>
              <SvgExploreComponentFiles/>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '55%', marginLeft: '5pt' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              PostgreSQLのファイルについて
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              PostgreSQLといえど、最終的なデータ保管はOS上のファイルによって行われます。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              テーブル上のファイルやインデックス、システムカタログなどもファイルとして保管されます。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              そのためデータの保管、つまり永続化はOSの機能を活用したものになります。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              無論、ACID特性を満たすためにさまざな機構が備えられています。
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <div ref={parseRef} id="table">
        <Box sx={{marginTop: "6pt"}}>
            <Table starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="index">
        <Box sx={{marginTop: "6pt"}}>
            <Index starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-process">
        <Box sx={{marginTop: "6pt"}}>
            <Catalog starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-memory">
        <Box sx={{marginTop: "6pt"}}>
            <WAL starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-process">
        <Box sx={{marginTop: "6pt"}}>
            <Others starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
    </Box>
  );
};

export default ComponentPostgresFile;
