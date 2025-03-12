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

export function pageInfoVirtualMedal(data: { pageNum: number; pageSize: number }) {
  return request<PageInfo<PointItem>>({
    url: "/low/carbon/virtual/medal/pageInfo",
    method: "POST",
    data,
  });
}