// 用户管理api接口

import { post, get } from "../utils/request";

/**
 * 获取当前用户信息
 * @returns
 */
export const getUserInfo = () => {
  return get("/user/info");
};

/**
 * 更新用户信息
 */
export const updateUserInfo = (data) => {
  return post("/user/update", data);
};

/**
 * 修改用户密码
 */
export const updateUserPassword = (data) => {
  return post("/user/password", data);
};