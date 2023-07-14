import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';



const TimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '20vh', width: '20vw'}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker/></LocalizationProvider>
    </Box>
  );
};

export default TimePicker;