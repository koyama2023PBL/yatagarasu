import * as React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import SvgExploreComponentHome from '../../SVGs/ReactComponent/Components/ExploreComponentHome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Component/Redux/StateStore';
import BackendProcess from './Backend/BackendProcess';
import BackendMemory from './Backend/BackendMemory';
import ListenerProcess from './Backend/ListenerProcess';
import { Outlet } from 'react-router-dom';

const steps = [
  { step: "backend-process", description: "1. バックエンドプロセス" },
  { step: "backend-memory", description: "2. バックエンドメモリ" },
  { step: "listener-process", description: "3. リスナープロセス" },
];

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const ComponentBackend: React.FC = () => { 
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
              PostgreSQL稼働状態
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: '1.5', marginLeft: '1vw'}}>
              <SvgExploreComponentHome/>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '55%', marginLeft: '5pt' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              PostgreSQLについて
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              PostgreSQLはOS上にて複数のプロセス群で稼働します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              Postmasterプロセスが最上位のプロセスとして稼働し、PostgreSQLの稼働に必要なプロセスを管理します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              アプリケーションなどからのコネクションは、1コネクション=1プロセスとして実行されます。
            </Typography>
            {steps.map((item) => (
              <Box key={item.step} sx={{ marginBottom: '1rem', marginLeft: '20pt'}}>
                <Link href={`#${item.step}`} color="secondary" variant="body1">
                  {`<${item.step}>`}: {item.description}
                </Link>
              </Box>
            ))}
            <Typography variant="body2" sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              ※クリックすると、各工程の詳細へジャンプします
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <div ref={parseRef} id="backend-process">
        <Box sx={{marginTop: "6pt"}}>
            <BackendProcess starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="backend-memory">
        <Box sx={{marginTop: "6pt"}}>
            <BackendMemory starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="listener-process">
        <Box sx={{marginTop: "6pt"}}>
            <ListenerProcess starttime={starttime} endtime={endtime}/> 
        </Box>
      </div>
    </Box>
  );
};

export default ComponentBackend;
