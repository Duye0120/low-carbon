import request from "@/api/request";

export function getOpenId(data: { js_code: string }) {
  return request<{
    openid: string;
  }>({
    url: "/low/carbon/applet/getOpenId",
    method: "GET",
    data,
  });
}

export function getToken(data: {
  headImg?: string;
  userName?: string;
  wxId: string;
}) {
  return request<string>({
    url: "/low/carbon/applet/getToken",
    method: "POST",
    data,
  });
}

export function getUserInfoByOpenId(data: { wxId: string }) {
  return request<{
    wxId: string;
  }>({
    url: "/low/carbon/applet/getUserInfo",
    method: "GET",
    data: data ? data : { wxId: uni.getStorageSync("uuid") },
  });
}
