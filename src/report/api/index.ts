import request from "@/api/request";

export function getReport(data: { wxId: string }) {
    return request<any>({
      url: "/low/experience/report/getReport",
      method: "POST",
      data,
    });
  }
  