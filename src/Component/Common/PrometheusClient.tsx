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

export async function invokeQueryRange<T>(query: string, start: Date, end: Date, scrapeInterval: string | undefined) :Promise<{status: number, data: T}> {
  try {
    const endpoint = `/api/v1/query_range`
        + `?query=${encodeURIComponent(query)}`
        + `&start=${start.toISOString()}`
        + `&end=${end.toISOString()}`
        + `&step=${calcMaxStep(start, end, scrapeInterval?? '15s')}`;
    const response = await instance.get<T>(endpoint);
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}
