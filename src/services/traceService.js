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
  // 基础信息（快速加载）
  async getProductBasicInfo(productId) {
    try {
      // 模拟数据返回 - 仅返回基础信息
      const baseData = beefJerkyData[productId] || beefJerkyData['20231022A01'];
      return {
        productName: baseData.productName,
        shelfLife: baseData.shelfLife,
        netWeight: baseData.netWeight,
        sellingPoint: baseData.sellingPoint,
        storageMethod: baseData.storageMethod,
        consumptionMethod: baseData.consumptionMethod,
        productDetails: baseData.productDetails
      };
    } catch (error) {
      throw new Error(`获取产品基础信息失败: ${error.message}`);
    }
  },
  
  // 获取产品详细信息
  async getProductDetails(productId) {
    try {
      // 模拟数据返回 - 返回详细信息
      const baseData = beefJerkyData[productId] || beefJerkyData['20231022A01'];
      return {
        inspectionReports: baseData.inspectionReports,
        companyInfo: baseData.companyInfo,
        manufacturerInfo: baseData.manufacturerInfo,
        upstreamInfo: baseData.upstreamInfo
      };
    } catch (error) {
      throw new Error(`获取产品详细信息失败: ${error.message}`);
    }
  },
  
  // 获取评论数据
  async getProductComments(productId) {
    try {
      // 模拟评论数据
      return [
        {
          id: '1',
          username: '李先生',
          avatar: '/imgs/Group19120@3x.png',
          rating: 5,
          content: '肉质非常好，口感鲜嫩，值得推荐！',
          time: '2023-11-10 14:30',
          recommend: '推荐'
        },
        {
          id: '2',
          username: '张女士',
          avatar: '/imgs/image26@3x.png',
          rating: 4,
          content: '味道不错，分量也很足，下次还会购买。',
          time: '2023-11-05 10:15',
          recommend: '推荐'
        }
      ];
    } catch (error) {
      throw new Error(`获取产品评论失败: ${error.message}`);
    }
  },
  
  // 获取评分摘要
  async getProductRatings(productId) {
    try {
      // 模拟评分数据
      return {
        average: 4.5,
        count: 128,
        fiveStar: 85,
        fourStar: 30,
        threeStar: 10,
        twoStar: 2,
        oneStar: 1
      };
    } catch (error) {
      throw new Error(`获取产品评分失败: ${error.message}`);
    }
  },
  
  // 原始方法保持兼容
  async getProductTrace(productId) {
    try {
      // 移除模拟延迟以提高性能
      
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
  
  // 添加通过产品码获取数据的方法（兼容现有代码）
  async getProductTraceByCode(productCode) {
    return this.getProductTrace(productCode);
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