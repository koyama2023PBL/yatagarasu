import React, { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import ja from 'date-fns/locale/ja'
import { setFromDate, setToDate } from '../Redux/DateState';
import Typography from '@mui/material/Typography';
import { truncateMinites } from './Util';
import { Card, CardContent } from '@mui/material';

const TimePicker = () => {
  const dispatch = useDispatch();

  const oneHourAgo = truncateMinites(new Date());
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  const [temporaryFromDate, setTemporaryFromDate] = useState<Date | null>(oneHourAgo);
  
  const [temporaryToDate, setTemporaryToDate] = useState<Date | null>(truncateMinites(new Date()));
  

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
      dispatch(setFromDate(temporaryFromDate.toISOString()));
      dispatch(setToDate(temporaryToDate.toISOString()));
    }
  };

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '20vh', width: '25vw', marginTop: '-20px',marginBottom: '-20px' }}>
          <h4>時刻設定</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: '-15px',marginBottom: '-15px'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 'auto', marginLeft: 'auto'}}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja} dateFormats={{ monthAndYear: 'yyyy年 MM月' }} >
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant="body1" marginLeft="1vw" marginRight="1vw">測定開始時刻</Typography>
                  <DateTimePicker
                    label="From"
                    value={temporaryFromDate}
                    onChange={handleFromDateChange}
                    minutesStep={5}
                    maxDate={new Date()}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1vh' }}>
                  <Typography variant="body1" marginLeft="1vw" marginRight="1vw">測定終了時刻</Typography>
                  <DateTimePicker
                    label="To"
                    value={temporaryToDate}
                    onChange={handleToDateChange}
                    minutesStep={5}
                    maxDate={new Date()}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
            <Button variant="outlined" onClick={handleSubmit} style={{ marginLeft: 'auto', marginRight: 'auto' }}>変更</Button>
          </div>
        </div>
      </CardContent>
    </Card>

  );
};

export default TimePicker;
