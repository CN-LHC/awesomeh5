import axios from "axios";
import { Message } from "element-ui";

// api 配置

let timer = null;

const onError = error => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.statusText;
    const token = localStorage.getItem("Authorization");

    if (token && status === 403) {
      Message.error({ message: "禁止访问", description: message });
    }

    if (status === 404) {
      Message.error({ message: "未知资源", description: message });
    }

    if (status === 429) {
      Message.error({ message: "请勿频繁发布文章", description: message });
    }

    if (status === 500) {
      Message.error({
        message: "服务器错误",
        description: message
      });
    }

    if (token && status === 401 && !timer) {
      timer = setTimeout(() => {
        Message.error({
          message: "未授权",
          description: "授权失败，请重新登录"
        });
        if (token) {
          // store.dispatch("user/Logout").then(() => router.replace("/login"));
        }
        timer = null;
      }, 500);
    }
  }
  return Promise.reject(error);
};

const request = axios.create({
  baseURL: "https://comm.wedengta.com",
  timeout: 100000,
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    post: {
      "Content-Type": "application/json;charset=utf-8"
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: false,
});

// 响应拦截器
request.interceptors.response.use(response => {
  const status = response.status;
  if (status != 200) {
    return Promise.reject(response);
  }

  const code = response.data.code;
  // 处理业务代码错误
  if (code && code !== 200 && code !== 20000) {
    // Message.error(response.data.error_msg);
    return Promise.reject(response);
  }

  // if (response.data.size) return response.data;
  return response.data;
}, onError);

export default request;
