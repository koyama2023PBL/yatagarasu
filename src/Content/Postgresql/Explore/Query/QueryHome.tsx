import * as React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import SvgExploreQueryHome from '../../SVGs/ReactComponent/Queries/ExploreQueryHome';
import QueryParse from './QueryParse';
import QueryAnalyze from './QueryAnalyze';
import QueryPlanning from './QueryPlanning';
import QueryExecution from './QueryExecution';

const steps = [
  { step: "Parse", description: "1. クエリパース" },
  { step: "Analyze", description: "2. クエリ解析" },
  { step: "Planning", description: "3. 実行計画作成" },
  { step: "Execution", description: "4. クエリの実行" },
];

const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

const QueryHome: React.FC = () => {
  const parseRef = React.createRef<HTMLDivElement>();

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: string) => {
      scrollToRef(parseRef);
  };


  return (
    <Box>
      <Box sx={{ display: 'flex'}}>
        <Card sx={{ flex: 1, width: '45%'}}>
          <CardContent>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" gutterBottom>
                SQLクエリの処理フロー
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', p: '1.5', marginLeft: '1vw'}}>
              <SvgExploreQueryHome/>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: '55%', marginLeft: '5pt' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              PostgreSQLにおけるクエリの処理順序
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              PostgreSQLにおいて、DBへリクエストされたクエリの処理順序を示します。
              </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '4px' }}>
              SQLは受け付けたものをそのまま実行するのではなく、効率的に処理を行うためさまざまな工程を得て処理が行われます。
            </Typography>
            <Typography variant="body1" paragraph sx={{ marginLeft: '12pt', marginBottom: '10px' }}>
              具体的には、以下の順です。
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
      <div ref={parseRef} id="Parse">
        <Box sx={{marginTop: "6pt"}}>
            <QueryParse /> 
        </Box>
      </div>
      <div ref={parseRef} id="Analyze">
        <Box sx={{marginTop: "6pt"}}>
            <QueryAnalyze /> 
        </Box>
      </div>
      <div ref={parseRef} id="Planning">
        <Box sx={{marginTop: "6pt"}}>
            <QueryPlanning /> 
        </Box>
      </div>
      <div ref={parseRef} id="Execution">
        <Box sx={{marginTop: "6pt"}}>
            <QueryExecution /> 
        </Box>
      </div>
    </Box>
  );
};

export default QueryHome;
