import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFromDate, setToDate } from '../Redux/DateState';
import { parseDateString } from './Util';
import { RootState } from '../Redux/StateStore';
import { format } from 'date-fns';


/** 
 *クエリストリング情報を読み取りStateに反映したあと、Stateの情報をクエリに反映する
*/
export const useSyncQueryString = () =>{
  //fromとtoを読み取り、Stateに反映する
  updateReduxStateFromQuery();
  //Stateからfromとtoへ反映する
  updateQueryStringFromReduxState();
}

/** 
 *クエリストリングを解析してReduxの状態を更新する
*/
const updateReduxStateFromQuery = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const fromDate = from ? parseDateString(from) : null;
    const toDate = to ? parseDateString(to) : null;

    if (fromDate && toDate) {
      if (toDate > fromDate) {
        dispatch(setFromDate(fromDate.toISOString()));
        dispatch(setToDate(toDate.toISOString()));
      }
    }

  }, [dispatch, searchParams]);
};

/** 
  Reduxの状態をクエリストリングへ反映する
*/
const updateQueryStringFromReduxState = () => {
  const navigate = useNavigate();
  const { from, to } = useSelector((state: RootState) => state.date);

  useEffect(() => {
    const fromString = format(new Date(from), 'yyyyMMddHHmmss');
    const toString = format(new Date(to), 'yyyyMMddHHmmss');
    const search = `?from=${fromString}&to=${toString}`;
    navigate(search, { replace: true });
  }, [from, to, navigate]);
};
