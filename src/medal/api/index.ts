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

export function pageInfoVirtualMedal(data: { wxId: string }) {
  return request<PageInfo<PointItem>>({
    url: "/low/carbon/virtual/medal/pageInfoVirtualMedal",
    method: "POST",
    data,
  });
}

export function pageInfoHaved(data: { wxId: string }) {
  return request<PageInfo<PointItem>>({
    url: "/low/carbon/medal/pageInfoVirtualMedal",
    method: "POST",
    data,
  });
}

export function pageInfoRealMedal(data: { wxId: string }) {
  return request<PageInfo<PointItem>>({
    url: "/low/carbon/real/medal/pageInfoRealMedal",
    method: "POST",
    data,
  });
}

export function exchangeVirtualMedal(data: { wxId: string, needScore: number, virtualMedalId: string, virtualMedalName: string }) {
  return request<void>({
    url: "/low/carbon/medal/exchangeVirtualMedal",
    method: "POST",
    data,
  });
}

export function pageInfoExchangeMedal(data: { wxId: string, exchangeType: string }) {
  return request<any>({
    url: "/low/carbon/medal/exchange/record/pageInfo",
    method: "POST",
    data,
  });
}

export function exchangeRealMedalApi(data: { wxId: string, needNum: number, realMedalId: string, realMedalName: string, virtualMedalId: string }) {
  return request<void>({
    url: "/low/carbon/medal/exchangeRealMedal",
    method: "POST",
    data,
  });
}

export function pageInfoTicket(data: { wxId: string }) {
  return request<void>({
    url: "/low/carbon/medal/exchange/ticket/pageInfo",
    method: "POST",
    data,
  });
}