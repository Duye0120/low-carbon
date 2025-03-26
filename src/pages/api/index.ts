import request from "@/api/request";

interface PageInfo<T> {
  total: number;
  list: T[];
}

export interface PointItem {
  id: string;
  pointName: string;
  pointDesc: string;
}

export function pageInfoPoint(data: { pageNum: number; pageSize: number }) {
  return request<PageInfo<PointItem>>({
    url: "/low/carbon/play/point/pageInfo",
    method: "POST",
    data,
  });
}

export interface WeekSignItem {
  date: string;
  isSign: number;
}

export function getWeekSign(data: { wxId: string }) {
  return request<{
    signDays: number;
    todaySigned: number;
    weekSign: Array<WeekSignItem>;
  }>({
    url: "/low/carbon/task/getWeekSign",
    method: "POST",
    data,
  });
}

export function finishSignTask(data: { wxId: string }) {
  return request<void>({
    url: "/low/carbon/task/finishSignTask",
    method: "POST",
    data,
  });
}

export function submitWalk(data: {
  encryptedData: string;
  iv: string;
  wxId: string;
  sessionKey: string;
}, type: 'begin' | 'end') {
  return request<void>({
    url: `/low/carbon/wx/step/${type}Submit`,
    method: "POST",
    data,
  });
}
