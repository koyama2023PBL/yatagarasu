import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';


import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import { Typography } from '@mui/material';
import ThresholdsTable from '../../Content/Setting/ThresholdSetting';


const SettingMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <div>
      <ThresholdsTable/>
    </div>
  );
}

export default SettingMenu;