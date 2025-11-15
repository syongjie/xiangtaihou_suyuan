/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-08-29 12:14:37
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-16 17:51:54
 * @FilePath: \DCBBPrivate\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入统一的HTTP请求工具
import { http } from '@/utils/request';

export const traceService = {
  // 根据产品ID获取溯源信息
  async getProductTrace(productId) {
    return await http.get(`/trace/${productId}`);
  },
  // 根据商品码获取溯源信息
  async getProductTraceByCode(code) {
    return await http.get('/trace/product/verify', { code });
  },

  // 获取公司信息
  async getCompanyInfo(companyId) {
    return await http.get(`/company/${companyId}`);
  },

  // 获取生产流程
  async getProductionProcess(productId) {
    return await http.get(`/production/${productId}`);
  }
};

export const commentService = {
  // 提交评价
  async submitComment (payload) {
    const formData = new FormData()
    // 普通字段
    formData.append('productId', payload.productId)
    formData.append('recommend', payload.recommend) // '推荐' | '不推荐'
    formData.append('comment', payload.comment)
    formData.append('suggestion', payload.suggestion)
    // 视频文件（可能为空）
    if (payload.video) {
      formData.append('video', payload.video)
    }

    // 使用统一的上传方法
    return await http.upload('/comment', formData);
  }
}