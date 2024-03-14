import * as React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import SvgExploreComponentHome from '../../SVGs/ReactComponent/Components/ExploreComponentHome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Component/Redux/StateStore';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { NavLink, Outlet } from 'react-router-dom';

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const ComponentHome: React.FC = () => { 
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
      <Box sx={{ display: 'flex' }}>
        <Card sx={{ flex: 1, width: '45%' }}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" gutterBottom>
                PostgreSQLの各種プロセス
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: '1.5', marginLeft: '1vw' }}>
              <SvgExploreComponentHome />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '55%', marginLeft: '5pt' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              PostgreSQLの仕組み
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              PostgreSQLはOS上にて複数のプロセス群で稼働します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              Postmasterプロセスが最上位のプロセスとして稼働し、PostgreSQLの稼働に必要なプロセスを管理します。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '10px' }}>
              アプリケーションなどからのコネクションは、1コネクション=1プロセスとして実行されます。
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', p: '1.5', marginLeft: '1vw' }}>
            <NavLink style={{textDecoration: 'none'}} to="/explore/component/backend-process">
              <Card sx={{ height: '10vh', width: '15vw', marginLeft: '1vw' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <Typography variant="body2">
                      1. Backend processes
                    </Typography>
                    <ArrowCircleRightIcon sx={{ transform: 'scale(2)', color: '#073A66' }} />
                  </Box>
                </CardContent>
              </Card>
            </NavLink>
            <NavLink style={{textDecoration: 'none'}} to="/explore/component/postgres-process">
              <Card sx={{ height: '10vh', width: '15vw', marginLeft: '1vw' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <Typography variant="body2">
                      2. PostgreSQL's processes
                    </Typography>
                    <ArrowCircleRightIcon sx={{ transform: 'scale(2)', color: '#073A66' }} />
                  </Box>
                </CardContent>
              </Card>
            </NavLink>
            <NavLink style={{textDecoration: 'none'}} to="/explore/component/postgres-file">
              <Card sx={{ height: '10vh', width: '15vw', marginLeft: '1vw' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <Typography variant="body2">
                      3. PostgreSQL's files
                    </Typography>
                    <ArrowCircleRightIcon sx={{ transform: 'scale(2)', color: '#073A66' }} />
                  </Box>
                </CardContent>
              </Card>
            </NavLink>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ComponentHome;
