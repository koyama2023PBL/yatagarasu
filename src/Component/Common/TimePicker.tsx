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
import { RootState } from '../Redux/StateStore';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const TimePicker = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);

  const [temporaryFromDate, setTemporaryFromDate] = useState<Date | null>(starttime);
  const [temporaryToDate, setTemporaryToDate] = useState<Date | null>(endtime);

  const handleSubmit = () => {
    if (temporaryFromDate && temporaryToDate) {
      if (temporaryFromDate > temporaryToDate) {
        alert("開始時間は終了時間より前に設定してください");
        return;
      }

      dispatch(setFromDate(temporaryFromDate.toISOString()));
      dispatch(setToDate(temporaryToDate.toISOString()));

      const from = format(temporaryFromDate, 'yyyyMMddHHmmss');
      const to = format(temporaryToDate, 'yyyyMMddHHmmss');
      navigate({pathname: location.pathname,search: `?from=${from}&to=${to}`});
    }
  };

  return (
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                From
              </Typography>
              <DateTimePicker
                value={starttime}
                minutesStep={1}
                onChange={(newValue) => setTemporaryFromDate(newValue)}
                maxDate={new Date()}
                sx={{ backgroundColor: 'white'}}
                slotProps={{ textField: { size: 'small' } }}
                views={['year', 'day', 'hours', 'minutes', 'seconds']}
              />
              <Typography variant="body2" sx={{ mx: 1 }}>
                To
              </Typography>
              <DateTimePicker
                value={endtime}
                minutesStep={1}
                onChange={(newValue) => setTemporaryToDate(newValue)}
                maxDate={new Date()}
                sx={{ backgroundColor: 'white'}}
                slotProps={{ textField: { size: 'small' } }}
                views={['year', 'day', 'hours', 'minutes', 'seconds']}
              />
            </Box>
          </LocalizationProvider>
          <Button 
            variant="outlined" 
            onClick={handleSubmit} 
            sx={{ 
              borderColor: 'white',
              color: 'white',
              height: 'fit-content' ,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
              },
            }}>
            SET
          </Button>
        </Box>
  );
};


export default TimePicker;
