// axios封装

import axios from "axios";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加token
    const userStore = useUserStore();

    const token = userStore.getToken;

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    if (import.meta.env.VITE_DEBUG) {
      const fullUrl = config.baseURL + config.url;
      console.log("📍 请求地址：" + fullUrl);
      console.log("🔧 请求方法：" + config.method);
      console.log("📦 请求参数：" + JSON.stringify(config.data));
    }

    return config;
  },
  (error) => {
    console.error('❌ 请求错误:', error)
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 获取接口返回数据
    const { status, data, config } = res;

    if (import.meta.env.VITE_DEBUG) {
      // 完整的url路径和请求方法、返回的数据
      const fullUrl = config.baseURL + config.url;
      console.log("📍 接口地址：" + fullUrl);
      console.log('📊 响应状态:', status)
      console.log("📦 返回数据：" + JSON.stringify(data));
    }

    // 统一处理
    if (status === 200 && data.code === 200) {
      return data;
    } else {
      log.error(data.message);
      ELMessage.error(data.message);
      return Promise.reject(data);
    }
  },
  (error) => {
    if (!error.response) {
      ElMessage.error("网络连接失败，请检查网络设置");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // HTTP状态码错误处理
    switch (status) {
      case 400:
        ElMessage.error(data?.message || "请求参数错误");
        break;
      case 401:
        ElMessage.error(data?.message || "登录凭证已过期");
        break;
      case 403:
        ElMessage.error(data?.message || "没有权限访问");
        break;
      case 404:
        ElMessage.error(data?.message || "请求的资源不存在");
        break;
      case 500:
        ElMessage.error(data?.message || "服务器内部错误");
        break;
      case 502:
        ElMessage.error("网关错误");
        break;
      case 503:
        ElMessage.error("服务不可用");
        break;
      case 504:
        ElMessage.error("网关超时");
        break;
      default:
        ElMessage.error(data?.message || `请求失败 (${status})`);
    }

    return Promise.reject(error);
  }
);

// 封装请求

// POST
export const post = (url, data) => {
  return service({
    url,
    method: "post",
    data,
  });
};

// GET
export const get = (url, params) => {
  return service({
    url,
    method: "get",
    params,
  });
};

// PUT
export const put = (url, data) => {
  return service({
    url,
    method: "put",
    data,
  });
};

// DELETE
export const del = (url, params) => {
  return service({
    url,
    method: "delete",
    params,
  });
};

export const patch = (url, data) => {
  return service({
    url,
    method: "patch",
    data,
  });
};

// 文件上传
export const upload = (url, data) => {
  return service({
    url,
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default service;
