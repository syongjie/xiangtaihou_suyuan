
// import axios from 'axios';
// import { storage } from '@/utils/storage';

// //测试
// // const baseURL = 'https://testapi.bitcoinbanks.biz/api';
// // const baseURL = 'http://192.168.2.4:9225/api';
// // 正式
// const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.bitcoinbanks.biz/api';
// console.log('API Base URL:', baseURL);


// const timeout = Number(import.meta?.env?.VITE_API_TIMEOUT || 15000);

// // 刷新锁与队列
// let isRefreshing = false;
// let pendingQueue = []; // [(token) => void]

// const instance = axios.create({
//   baseURL,
//   timeout,
//   withCredentials: false,
// });

// // 统一登出处理（按你的项目改造）
// function handleLogout() {
//   storage.removeToken();
//   storage.removeRefreshToken();
//   // 比如路由跳转到登录页
//   localStorage.clear();
//   window.location.replace('/');
// }

// // 错误工具
// function createError(name, message, extra = {}) {
//   const err = new Error(message);
//   err.name = name;
//   Object.assign(err, extra);
//   return err;
// }
// function httpStatusMsg(status, fallback) {
//   const map = {
//     400: '请求参数错误',
//     401: '未授权或登录过期',
//     403: '没有权限',
//     404: '资源不存在',
//     408: '请求超时',
//     413: '请求体过大',
//     429: '请求过于频繁',
//     500: '服务器异常',
//     502: '网关错误',
//     503: '服务不可用',
//     504: '网关超时',
//   };
//   return map[status] || fallback || '网络或服务器异常';
// }

// // 请求拦截：注入 Token、通用头
// instance.interceptors.request.use(
//   (config) => {
//     const token = storage.getToken();
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     if ((config.method || 'GET').toUpperCase() === 'GET') {
//       config.headers = { ...config.headers };
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 响应拦截：业务 code 处理 + 401 刷新
// instance.interceptors.response.use(
//   (response) => {
//     const data = response.data;
//     // 约定：后端返回 { code, data, msg }
//     if (data && Object.prototype.hasOwnProperty.call(data, 'code')) {
//       if (data.code === 0) return data.data;
//       return Promise.reject(createError('BizError', data.msg || '业务异常', { code: data.code }));
//     }
//     // 未包装的接口，直接返回 body
//     return data;
//   },
//   async (error) => {
//     const { response, config } = error;

//     // 无响应：超时或断网
//     if (!response) {
//       return Promise.reject(createError('NetError', '网络异常或请求超时', { original: error }));
//     }

//     const status = response.status;

//     // 401：尝试刷新 Token
//     if (status === 401 && config) {
//       const originalRequest = { ...config };
//       if (originalRequest._retry) {
//         handleLogout();
//         return Promise.reject(createError('AuthError', '登录过期，请重新登录'));
//       }
//       originalRequest._retry = true;

//       try {
//         const token = await refreshAccessToken();
//         // 通知队列
//         pendingQueue.forEach((cb) => cb(token));
//         pendingQueue = [];
//         // 重新发起原请求
//         originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${token}` };
//         return instance(originalRequest);
//       } catch (e) {
//         pendingQueue = [];
//         handleLogout();
//         return Promise.reject(createError('AuthError', '登录过期，请重新登录'));
//       }
//     }

//     // 其它状态码
//     const msg = httpStatusMsg(status, response?.data?.msg);
//     return Promise.reject(createError('HttpError', msg, { status, data: response.data, config }));
//   }
// );

// // 刷新 Token（并发合并）
// async function refreshAccessToken() {
//   if (isRefreshing) {
//     return new Promise((resolve) => {
//       pendingQueue.push(resolve);
//     });
//   }
//   isRefreshing = true;
//   try {
//     const rt = storage.getRefreshToken();
//     if (!rt) throw new Error('no refresh token');

//     const resp = await axios.post(`${baseURL}/auth/refresh`, { refreshToken: rt }, { timeout: 10000 });
//     // 兼容不同返回结构
//     const payload = resp.data?.data || resp.data;
//     const accessToken = payload?.accessToken;
//     const refreshToken = payload?.refreshToken;
//     if (!accessToken) throw new Error('invalid refresh response');

//     storage.setToken(accessToken);
//     if (refreshToken) storage.setRefreshToken(refreshToken);

//     return accessToken;
//   } finally {
//     isRefreshing = false;
//   }
// }

// /* 对外导出的方法 */
// export const http = {
//   get(url, params = {}, config = {}) {
//     return instance.get(url, { params, ...config });
//   },
//   post(url, data = {}, config = {}) {
//     return instance.post(url, data, config);
//   },
//   put(url, data = {}, config = {}) {
//     return instance.put(url, data, config);
//   },
//   delete(url, params = {}, config = {}) {
//     return instance.delete(url, { params, ...config });
//   },

//   // 文件上传（multipart/form-data）
//   upload(url, formData, config = {}) {
//     return instance.post(url, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       ...config,
//     });
//   },

//   // 文件下载（流）
//   download(url, params = {}, filename = 'download', config = {}) {
//     return instance.get(url, { params, responseType: 'blob', ...config })
//       .then((blob) => {
//         const data = blob instanceof Blob ? blob : new Blob([blob]);
//         const link = document.createElement('a');
//         const href = URL.createObjectURL(data);
//         link.href = href;
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//         URL.revokeObjectURL(href);
//       });
//   },

//   // 取消请求示例
//   cancelable(configCreator) {
//     const controller = new AbortController();
//     const cfg = typeof configCreator === 'function' ? configCreator(controller) : {};
//     return {
//       run: (method = 'get', url, dataOrParams = {}, config = {}) => {
//         const final = { signal: controller.signal, ...cfg, ...config };
//         if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
//           return instance[method](url, { params: dataOrParams, ...final });
//         }
//         return instance[method](url, dataOrParams, final);
//       },
//       cancel: () => controller.abort('canceled'),
//     };
//   },
// };

// export default http;

// 报错大于500的情况视为系统维护
import axios from 'axios';
import { storage } from '@/utils/storage';
import router from '@/router';

//测试
// const baseURL = 'https://testapi.bitcoinbanks.biz/api';
// const baseURL = 'http://192.168.2.4:9225/api';
// 正式
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.bitcoinbanks.biz/api';
console.log('API Base URL:', baseURL);

const timeout = Number(import.meta?.env?.VITE_API_TIMEOUT || 15000);

// 刷新锁与队列
let isRefreshing = false;
let pendingQueue = []; // [(token) => void]

const instance = axios.create({
  baseURL,
  timeout,
  withCredentials: false,
});

// 统一登出处理（按你的项目改造）
function handleLogout() {
  storage.removeToken();
  storage.removeRefreshToken();
  // 比如路由跳转到登录页
  localStorage.clear();
  window.location.replace('/');
}

// 错误工具
function createError(name, message, extra = {}) {
  const err = new Error(message);
  err.name = name;
  Object.assign(err, extra);
  return err;
}

function httpStatusMsg(status, fallback) {
  const map = {
    400: '请求参数错误',
    401: '未授权或登录过期',
    403: '没有权限',
    404: '资源不存在',
    408: '请求超时',
    413: '请求体过大',
    429: '请求过于频繁',
    500: '服务器异常，系统正在维护中',
    502: '网关错误，系统正在维护中',
    503: '系统正在维护中，请稍后再试',
    504: '网关超时，系统正在维护中',
  };
  return map[status] || fallback || '网络或服务器异常';
}

// 请求拦截：注入 Token、通用头
instance.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    if ((config.method || 'GET').toUpperCase() === 'GET') {
      config.headers = { ...config.headers };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截：业务 code 处理 + 401 刷新 + 500以上维护处理
instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    // 约定：后端返回 { code, data, msg }
    if (data && Object.prototype.hasOwnProperty.call(data, 'code')) {
      if (data.code === 0) return data.data;
      return Promise.reject(createError('BizError', data.msg || '业务异常', { code: data.code }));
    }
    // 未包装的接口，直接返回 body
    return data;
  },
  async (error) => {
    const { response, config } = error;

    // 无响应：超时或断网
    if (!response) {
      return Promise.reject(createError('NetError', '网络异常或请求超时', { original: error }));
    }

    const status = response.status;

    // 401：尝试刷新 Token
    if (status === 401 && config) {
      const originalRequest = { ...config };
      if (originalRequest._retry) {
        handleLogout();
        return Promise.reject(createError('AuthError', '登录过期，请重新登录'));
      }
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        // 通知队列
        pendingQueue.forEach((cb) => cb(token));
        pendingQueue = [];
        // 重新发起原请求
        originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${token}` };
        return instance(originalRequest);
      } catch (e) {
        pendingQueue = [];
        handleLogout();
        return Promise.reject(createError('AuthError', '登录过期，请重新登录'));
      }
    }

    // 500以上状态码：系统维护
    if (status >= 500) {
      const maintenanceMsg = response.data?.msg || httpStatusMsg(status) || '系统正在维护中，请稍后再试';

        // 如果不是已经在维护页面，则跳转
      if (router.currentRoute.value.path !== '/maintain') {
        router.push('/maintain')
      }

      return Promise.reject(createError('MaintenanceError', maintenanceMsg, { 
        status, 
        data: response.data, 
        config,
        isMaintenance: true // 添加标记，便于组件识别
      }));
    }

    // 其它状态码
    const msg = httpStatusMsg(status, response?.data?.msg);
    return Promise.reject(createError('HttpError', msg, { status, data: response.data, config }));
  }
);

// 刷新 Token（并发合并）
async function refreshAccessToken() {
  if (isRefreshing) {
    return new Promise((resolve) => {
      pendingQueue.push(resolve);
    });
  }
  isRefreshing = true;
  try {
    const rt = storage.getRefreshToken();
    if (!rt) throw new Error('no refresh token');

    const resp = await axios.post(`${baseURL}/auth/refresh`, { refreshToken: rt }, { timeout: 10000 });
    // 兼容不同返回结构
    const payload = resp.data?.data || resp.data;
    const accessToken = payload?.accessToken;
    const refreshToken = payload?.refreshToken;
    if (!accessToken) throw new Error('invalid refresh response');

    storage.setToken(accessToken);
    if (refreshToken) storage.setRefreshToken(refreshToken);

    return accessToken;
  } finally {
    isRefreshing = false;
  }
}

/* 对外导出的方法 */
export const http = {
  get(url, params = {}, config = {}) {
    return instance.get(url, { params, ...config });
  },
  post(url, data = {}, config = {}) {
    return instance.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return instance.put(url, data, config);
  },
  delete(url, params = {}, config = {}) {
    return instance.delete(url, { params, ...config });
  },

  // 文件上传（multipart/form-data）
  upload(url, formData, config = {}) {
    return instance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config,
    });
  },

  // 文件下载（流）
  download(url, params = {}, filename = 'download', config = {}) {
    return instance.get(url, { params, responseType: 'blob', ...config })
      .then((blob) => {
        const data = blob instanceof Blob ? blob : new Blob([blob]);
        const link = document.createElement('a');
        const href = URL.createObjectURL(data);
        link.href = href;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(href);
      });
  },

  // 取消请求示例
  cancelable(configCreator) {
    const controller = new AbortController();
    const cfg = typeof configCreator === 'function' ? configCreator(controller) : {};
    return {
      run: (method = 'get', url, dataOrParams = {}, config = {}) => {
        const final = { signal: controller.signal, ...cfg, ...config };
        if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
          return instance[method](url, { params: dataOrParams, ...final });
        }
        return instance[method](url, dataOrParams, final);
      },
      cancel: () => controller.abort('canceled'),
    };
  },
};

export default http;
