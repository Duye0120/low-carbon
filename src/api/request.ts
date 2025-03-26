import config from "@/config.ts";
import { getToken, getOpenId } from "@/api/account";

const URL = config.baseUrl;

// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number;
  msg: string;
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data: T;
}

interface Res<T = unknown> {
  data: ResultData<T>;
}

// 全局变量，用于控制token刷新状态和请求队列
let isRefreshing = false;
let requestsQueue: (() => Promise<any>)[] = [];

const requestTask = <T>(options: UniApp.RequestOptions): Promise<T> => {
  if (!/^(http|https):\/\/.*/.test(options.url)) {
    options.url = URL + options.url;
  }
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      timeout: 6000,
      header: Object.assign(
        { token: uni.getStorageSync("authorization") },
        options.header || {}
      ),
      success: (res) => {
        responseHandler(res as unknown as Res<T>)
          .then((_res: any) => resolve(_res))
          .catch(async (err) => {
            if (err?.type === "TOKEN_EXPIRED") {
              if (!isRefreshing) {
                isRefreshing = true;
                try {
                  await toLogin();
                  // 刷新成功后重新发起当前请求
                  const retryRes = await requestTask<T>(options);
                  resolve(retryRes);
                } catch (error: any) {
                  if (error?.type === "LOGIN_REQUIRED") {
                    reject(error);
                    return;
                  }
                  reject(error);
                } finally {
                  isRefreshing = false;
                  // 执行队列中的请求并清空队列
                  const queue = [...requestsQueue];
                  requestsQueue = [];
                  await Promise.all(queue.map((cb) => cb()));
                }
              } else {
                // 正在刷新，将当前请求加入队列
                requestsQueue.push(() => requestTask<T>(options));
                // 等待队列执行完成
                const retryRes = await new Promise<T>(
                  (queueResolve, queueReject) => {
                    requestsQueue.push(() =>
                      requestTask<T>(options)
                        .then(queueResolve)
                        .catch(queueReject)
                    );
                  }
                );
                resolve(retryRes);
              }
            } else if (err?.type === "LOGIN_REQUIRED") {
              // 直接拒绝，避免后续处理
              reject(err);
            } else {
              reject(err);
            }
          });
      },
      fail: (err) => {
        errorHandler(err).finally(() => reject(err));
      },
    });
  });
};

function responseHandler(res: Res): Promise<any> {
  const response = res.data;
  const { statusCode, data, header } = res as any; // 添加类型断言
  const { code } = response;
  if (code === undefined) {
    return Promise.resolve(response);
  } else {
    switch (code) {
      case 0:
        return Promise.resolve(response.data);
      case 403:
        // 返回特定错误类型，触发token刷新
        return Promise.reject({ type: "TOKEN_EXPIRED", response });
      default:
        errorLog(response.msg);
        return Promise.reject(response);
    }
  }
}

async function toLogin(): Promise<void> {
  return new Promise((resolve, reject) => {
    let wxId = uni.getStorageSync("wxId") || "";
    if (wxId) {
      getToken({ wxId })
        .then((res1) => {
          if (res1) {
            uni.setStorageSync("authorization", res1);
            resolve();
          } else {
            navigateToLogin();
            reject({ type: "LOGIN_REQUIRED" }); // 新增错误类型标识
          }
        })
        .catch(reject);
    } else {
      uni.login({
        provider: "weixin",
        success: (loginRes) => {
          console.log({ test: loginRes });
          getOpenId({ js_code: loginRes.code })
            .then(async (res) => {
              console.log({ test: res });
              wxId = res.openid;
              uni.setStorageSync("sessionKey", res.session_key);
              uni.setStorageSync("uuid", res.openid);
              try {
                const res1 = await getToken({ wxId });
                if (res1) {
                  uni.setStorageSync("authorization", res1);
                  resolve();
                } else {
                  navigateToLogin();
                  reject({ type: "LOGIN_REQUIRED" }); // 新增错误类型标识
                }
              } catch (error) {
                reject(error);
              }
            })
            .catch(reject);
        },
        fail: () => {
          uni.showToast({ title: "登录失败", icon: "none" });
          reject({ type: "LOGIN_FAILED" });
        },
      });
    }
  });
}

function navigateToLogin() {
  const routes = getCurrentPages();
  const curRoute = routes.length > 0 ? routes[routes.length - 1].route : "";
  if (curRoute !== "pages/login") {
    // 清空队列并重置刷新状态
    requestsQueue = [];
    isRefreshing = false;
    uni.reLaunch({ url: "/pages/login" });
  }
}

function errorHandler(error: any): Promise<any> {
  if (error && error.status === 403) {
    toLogin();
  } else {
    errorLog(error.error);
  }
  return Promise.reject(error);
}

function errorLog(err: string) {
  // #ifdef APP-PLUS
  plus.nativeUI.toast(err);
  // #endif
  // #ifndef APP-PLUS
  uni.showToast({
    title: err,
    icon: "none",
    mask: true,
  });
  // #endif
}

export default requestTask;
