/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-08-29 12:14:37
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-16 17:51:54
 * @FilePath: \DCBBPrivate\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/services/traceService.js
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const traceService = {
  // 根据产品ID获取溯源信息
  async getProductTrace(productId) {
    try {
      const response = await fetch(`${baseURL}/trace/${productId}`);
      if (!response.ok) {
        throw new Error('获取产品信息失败');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`网络请求失败: ${error.message}`);
    }
  },

  // 获取公司信息
  async getCompanyInfo(companyId) {
    const response = await fetch(`${baseURL}/company/${companyId}`);
    return await response.json();
  },

  // 获取生产流程
  async getProductionProcess(productId) {
    const response = await fetch(`${baseURL}/production/${productId}`);
    return await response.json();
  }
};