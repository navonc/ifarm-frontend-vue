// 安全认证接口

import { post } from '@/utils/request'

/**
 * 登录
 * @param {Object} data
 * @param {String} data.username 用户名/邮箱/手机号
 * @param {String} data.password 密码
 * @returns 
 */
export const login = (data) => {
    return post('/auth/login', data)
}


/**
 * 登出
 * @returns 
 */
export const logout = () => {
    return post('/auth/logout')
}
