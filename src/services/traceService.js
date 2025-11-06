// src/services/traceService.js
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 酱牛肉产品模拟数据
const beefJerkyData = {
  '20231022A01': {
    productName: "八不加精品酱牛肉",
    shelfLife: "270天",
    netWeight: "150g/袋",
    sellingPoint: "源头直采，蒙古国草原散养牛",
    storageMethod: "卫生、阴凉、通风、干燥处常温储藏、冷藏更佳",
    consumptionMethod: "温火慢炖",
    productDetails: [
      { label: '产品认证', value: '地理标志' },
      { label: '产品批次', value: '20231022A01' },
      { label: '检测报告', value: '点击查看' },
      { label: '上市日期', value: '2025.10.22' },
      { label: '产地', value: '宁夏中宁' },
      { label: '品牌', value: '祥泰厚' }
    ],
    inspectionReports: [
      { name: '检验检测报告', url: '' },
      { name: '质量检测报告', url: '' },
      { name: '卫生检测报告', url: '' },
      { name: '成分分析报告', url: '' }
    ],
    companyInfo: {
      fullName: '香港祥泰厚副食品集团有限公司',
      creditCode: '91410100MAD9K99BXY',
      legalRepresentative: '',
      phone: 'Jas Su: +86 15346573661',
      website: 'www.xiangtaihou.com',
      email: 'xiangtaihou@yeah.net（通用）',
      email2: '15346573661@163.com（SU）'
    },
    manufacturerInfo: [
      { label: '生产厂家', value: '祥泰厚食品加工厂' },
      { label: '生产地址', value: '宁夏中宁县食品工业园' },
      { label: '生产许可证', value: 'SC10664052100123' },
      { label: '成立时间', value: '2018年' }
    ],
    upstreamInfo: [
      { label: '原料来源', value: '蒙古国草原散养牛' },
      { label: '养殖方式', value: '天然散养' },
      { label: '饲料类型', value: '天然牧草' },
      { label: '屠宰加工', value: '符合清真标准' }
    ]
  },
  '20231022A02': {
    productName: "八不加精品酱牛肉",
    shelfLife: "270天",
    netWeight: "200g/袋",
    sellingPoint: "源头直采，蒙古国草原散养牛",
    storageMethod: "卫生、阴凉、通风、干燥处常温储藏、冷藏更佳",
    consumptionMethod: "温火慢炖",
    productDetails: [
      { label: '产品认证', value: '地理标志' },
      { label: '产品批次', value: '20231022A02' },
      { label: '检测报告', value: '点击查看' },
      { label: '上市日期', value: '2025.10.23' },
      { label: '产地', value: '宁夏中宁' },
      { label: '品牌', value: '祥泰厚' }
    ],
    // ... 其他数据类似，可以根据不同批次调整
  }
};

export const traceService = {
  async getProductTrace(productId) {
    try {
      // 在实际项目中，这里应该是真实的API调用：
      // const response = await fetch(`${baseURL}/trace/${productId}`);
      // if (!response.ok) throw new Error('获取产品信息失败');
      // return await response.json();
      
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟数据返回
      if (beefJerkyData[productId]) {
        return beefJerkyData[productId];
      } else {
        // 如果产品ID不存在，返回默认数据
        const defaultData = { ...beefJerkyData['20231022A01'] };
        defaultData.productDetails.find(item => item.label === '产品批次').value = productId;
        return defaultData;
      }
    } catch (error) {
      throw new Error(`获取产品溯源信息失败: ${error.message}`);
    }
  },

  // 提交评价
  async submitComment(productId, commentData) {
    try {
      const response = await fetch(`${baseURL}/products/${productId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      });
      
      if (!response.ok) {
        throw new Error('提交评价失败');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`提交评价失败: ${error.message}`);
    }
  }
};