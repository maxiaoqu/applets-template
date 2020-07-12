/**
 * @description 判断一些环境状态
 */

import { environment } from './environment'

// 判断是否是开发环境：是：true/不是：false
export const isProduction = environment === 'production'
