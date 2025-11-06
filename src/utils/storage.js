/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-08-28 10:39:22
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-14 18:35:01
 * @FilePath: \order2-h5d:\小花\DCBBPrivate\src\utils\storage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/utils/storage.js
const TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export const storage = {
  getToken() { return localStorage.getItem(TOKEN_KEY) || ''; },
  // getToken() { return  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ3YWxsZXRfYWRkcmVzcyI6ImJjMXE2cHA4Njh3ZHFxYXBxeGZxbHlod3Mwcmg2ajg5ZG14cXJuMjM3NiIsImlzcyI6ImJ0Yy1kYXBwIiwiZXhwIjoxNzU4MTYzNTE0LCJpYXQiOjE3NTc1NTg3MTR9.h9ZxxaaMd7Ij52vqy8F5wHM4l26zRqYi5PxX3jIhT70'; },
  
  setToken(t) { localStorage.setItem(TOKEN_KEY, t); },
  removeToken() { localStorage.removeItem(TOKEN_KEY); },

  getRefreshToken() { return localStorage.getItem(REFRESH_TOKEN_KEY) || ''; },
  setRefreshToken(t) { localStorage.setItem(REFRESH_TOKEN_KEY, t); },
  removeRefreshToken() { localStorage.removeItem(REFRESH_TOKEN_KEY); },
};