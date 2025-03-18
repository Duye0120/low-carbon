import request from "@/api/request";

export function pageInfoScoreRecord(data: {
    wxId: string;
  }) {
    return request<string>({
      url: "/low/carbon/score/record/pageInfo",
      method: "POST",
      data,
    });
  }
  