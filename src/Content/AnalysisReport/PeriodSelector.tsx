import React, {createContext, useState} from "react";
import {Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {setFromDate, setToDate} from "../../Component/Redux/DateState";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";
import {setReportingInfoItems} from "./ReportingInfo";

export const PeriodSelector = () => {
  const [selectingPeriod, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectPeriod = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const setDate = () => {
    const periodMap: { [key: string]: number } = {
      "12h": 12,
      "1d": 24,
      "3d": 72,
      "1w": 168,
      "2w": 336,
      "4w": 672,
      "8w": 1344,
    }
    const toDate = new Date();
    const fromDate = new Date(toDate.getTime() - periodMap[selectingPeriod] * 3600000);
    dispatch(setToDate(toDate.toISOString()));
    dispatch(setFromDate(fromDate.toISOString()));
    const to = format(toDate, 'yyyyMMddHHmmss');
    const from = format(fromDate, 'yyyyMMddHHmmss');
    navigate({pathname: location.pathname, search: `?from=${from}&to=${to}`});
    setReportingInfoItems(new Date(), fromDate, toDate, selectingPeriod);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControl sx={{ width: '15vw' }}>
            <InputLabel>診断期間を選択してください</InputLabel>
            <Select value={selectingPeriod} onChange={selectPeriod} label="診断期間を選択してください">
              <MenuItem value="12h">12h</MenuItem>
              <MenuItem value="1d">1d</MenuItem>
              <MenuItem value="3d">3d</MenuItem>
              <MenuItem value="1w">1w</MenuItem>
              <MenuItem value="2w">2w</MenuItem>
              <MenuItem value="4w">4w</MenuItem>
              <MenuItem value="8w">8w</MenuItem>
            </Select>
          </FormControl>
          <Button disabled={selectingPeriod == ''} variant="contained" color="primary" onClick={setDate} sx={{ marginLeft: '1vw', width: '5vw' }}>
            実行
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
