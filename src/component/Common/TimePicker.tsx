import React, { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import ja from 'date-fns/locale/ja'
import { setFromDate, setToDate } from '../Redux/DateState';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';
import { RootState } from '../Redux/StateStore';

const TimePicker = () => {

  const dispatch = useDispatch();

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);

  const [temporaryFromDate, setTemporaryFromDate] = useState<Date | null>(starttime);
  const [temporaryToDate, setTemporaryToDate] = useState<Date | null>(endtime);

  const handleFromDateChange = (date: Date | null) => {
    if (date && temporaryToDate && date > temporaryToDate) {
      alert("開始時間は終了時間より前に設定してください");
      return;
    }
    setTemporaryFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    if (date && temporaryFromDate && date < temporaryFromDate) {
      alert("終了時間は開始時間より後に設定してください");
      return;
    }
    setTemporaryToDate(date);
  };

  const handleSubmit = () => {
    if (temporaryFromDate && temporaryToDate) {
      if (temporaryFromDate > temporaryToDate) {
        alert("開始時間は終了時間より前に設定してください");
        return;
      }
      dispatch(setFromDate(temporaryFromDate));
      dispatch(setToDate(temporaryToDate));
    }
  };

  return (
<Card sx={{ width: '44vw'}}>
  <CardContent>
    <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
      Time Configuration
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginRight: 'auto', marginLeft: '0.5vw',marginTop: '1vh'}}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja} dateFormats={{ monthAndYear: 'yyyy年 MM月' }} >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography variant="body2" marginLeft='0.5vw' marginRight='0.5vw'>開始</Typography>
          <DateTimePicker
            label="From"
            value={starttime}
            onChange={handleFromDateChange}
            minutesStep={1}
            maxDate={new Date()}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1vh' }}>
          <Typography variant="body2" marginLeft='0.5vw' marginRight='0.5vw'>終了</Typography>
          <DateTimePicker
            label="To"
            value={endtime}
            onChange={handleToDateChange}
            minutesStep={1}
            maxDate={new Date()}
          />
        </Box>
      </LocalizationProvider>
      <Button variant="outlined" onClick={handleSubmit} style={{ marginLeft: '1vw', marginRight: '1vw', height: '4vh' }}>変更</Button>
    </Box>
  </CardContent>
</Card>


  );
};

export default TimePicker;
