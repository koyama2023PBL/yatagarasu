import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent } from '@mui/material';

const mermaidMarkup = `
    graph LR
      Queries -->|SQL file| Components[PostgreSQL's components]
      Components -->|Interacts with| Applications[Applications]
      Server --> ServerInfo[Server Information]
  `;

const MermaidChart: React.FC<{ chart: string }> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref} />;
};

export default MermaidChart;