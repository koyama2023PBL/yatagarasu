import {calcMaxStep} from "./Util";
import instance from "../../Axios/AxiosInstance";

export interface QueryRangeResponse<T> {
  status: string;
  data: QueryRangeData<T>;
}

export interface QueryRangeData<T> {
  resultType: string;
  result: QueryRangeResult<T>[];
}

export interface QueryRangeResult<T> {
  metric: T;
  values: [timestamp: number, value: string][];
}

export async function invokeQueryRange<T>(
    query: string,
    start: Date,
    end: Date,
    scrapeInterval: string | undefined,
    extraParams?: { [key: string]: any }
) :Promise<{status: number, data: T}> {
  try {
    const params = { ...{
      query: query,
      start: start.toISOString(),
      end  : end.toISOString(),
      step : calcMaxStep(start, end, scrapeInterval?? '15s')
    }, ...extraParams?? {} };

    const response = await instance.get<T>('/api/v1/query_range', {params: params} );
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}

export interface QueryResponse<T> {
  status: string;
  data: QueryData<T>;
}

export interface QueryData<T> {
  resultType: string;
  result: QueryResult<T>[];
}

export interface QueryResult<T> {
  metric: T;
  value: [timestamp: number, value: string];
}

export async function invokeQuery<T>(
    query: string,
    time: Date,
    extraParams?: { [key: string]: any }
) :Promise<{status: number, data: T}> {
  try {
    const params = { ...{
      query: query,
      time : time.toISOString(),
    }, ...extraParams?? {} };

    const response = await instance.get<T>('/api/v1/query', {params: params});
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}
