import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Thresholds } from '../../Component/Threshold/Threshold';

const ThresholdsTable: React.FC = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Metric Name</TableCell>
          <TableCell>OK</TableCell>
          <TableCell>Watch</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(Thresholds).map(([metric, values]) => (
          <TableRow key={metric}>
            <TableCell>{metric}</TableCell>
            <TableCell>{values.ok}</TableCell>
            <TableCell>{values.watch}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ThresholdsTable;
