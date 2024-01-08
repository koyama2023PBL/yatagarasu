import * as React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import ServerCpu from './ServerCpu';
import ServerMemory from './ServerMemory';
import ServerNetwork from './ServerNetwork';
import ServerStorage from './ServerStorage';
import SvgExploreServerHome from '../../SVGs/ReactComponent/Server/ExploreServerHome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Component/Redux/StateStore';

const steps = [
  { step: "CPU", description: "1. CPU" },
  { step: "MEMORY", description: "2. メモリ" },
  { step: "Network", description: "3. ネットワーク" },
  { step: "Storage", description: "4. ストレージ" },
];

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const ServerHome: React.FC = () => {
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
              DBサーバの稼働状態
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: '1.5', marginLeft: '1vw'}}>
              <SvgExploreServerHome/>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '55%', marginLeft: '5pt' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              DBサーバについて
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              前提として、DBはOSのプロセスとして動作します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              そのうちPostgreSQLは複数のPIDを持つマルチプロセス処理を行い、DBとしてのサービスを提供します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '10px' }}>
              OSが稼働するサーバの稼働状況を確認する場合、以下の4点は外せないポイントになります。
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
      <div ref={parseRef} id="CPU">
        <Box sx={{marginTop: "6pt"}}>
            <ServerCpu starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="MEMORY">
        <Box sx={{marginTop: "6pt"}}>
            <ServerMemory starttime={starttime} endtime={endtime} /> 
        </Box>
      </div>
      <div ref={parseRef} id="Network">
        <Box sx={{marginTop: "6pt"}}>
            <ServerNetwork starttime={starttime} endtime={endtime}/> 
        </Box>
      </div>
      <div ref={parseRef} id="Storage">
        <Box sx={{marginTop: "6pt"}}>
            <ServerStorage starttime={starttime} endtime={endtime}/> 
        </Box>
      </div>
    </Box>
  );
};

export default ServerHome;
