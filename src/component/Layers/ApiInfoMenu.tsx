import * as React from 'react';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';

import BackendApiInfo from '../../Content/BackendApi/BackendApiInfo';

const ApiInfoMenu: React.FC = () => {

  return (
    <div>
      <BackendApiInfo/>
    </div>
  );
}

export default ApiInfoMenu;