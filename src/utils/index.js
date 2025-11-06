/*
 * @Author: pq yxqxq79@gmail.com
 * @Date: 2025-07-22 16:10:30
 * @LastEditors: pq yxqxq79@gmail.com
 * @LastEditTime: 2025-09-02 17:31:06
 * @FilePath: \order2-h5d:\小花\DCBBPrivate\src\utils\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Decimal from 'decimal.js'
export function getTemp(timestamp) {
  console.log(timestamp, 'timestamp')

  // let timestamp = 1662537367
  // 此处时间戳以毫秒为单位
  let date = new Date(parseInt(timestamp))
  let Year = date.getFullYear()
  let Moth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let Hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let Minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let Sechond = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Year + '-' + Moth + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Sechond
  // let  GMT =  Year + '-' + Moth + '-' + Day + '   '+ Hour +':'+ Minute  + ':' + Sechond;
  // 时间戳

  console.log(GMT) // 2022-09-07 15:56:07
}
export function getTempHourMinuteSechond(timestamp) {
  // let timestamp = 1662537367
  // 此处时间戳以毫秒为单位
  let date = new Date(parseInt(timestamp))
  let Year = date.getFullYear()
  let Moth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  let Day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let Hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let Minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  let Sechond = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return (
    // Year + '-' +
    // Moth + '-' +
    // Day + ' ' +
    Hour + ':' + Minute + ':' + Sechond
  )
  // let  GMT =  Year + '-' + Moth + '-' + Day + '   '+ Hour +':'+ Minute  + ':' + Sechond;
  // 时间戳

  console.log(GMT) // 2022-09-07 15:56:07
}
export function preciseCalculate(operation, num1, num2, precision) {
  try {
    // 将输入的数字转换为 Decimal 实例
    const decimal1 = new Decimal(num1)
    const decimal2 = new Decimal(num2)
    let result

    // 根据运算类型执行相应操作
    switch (operation) {
      case 'add': // 加法
        result = decimal1.plus(decimal2)
        break
      case 'subtract': // 减法
        result = decimal1.minus(decimal2)
        break
      case 'multiply': // 乘法
        result = decimal1.times(decimal2)
        break
      case 'divide': // 除法
        result = decimal1.dividedBy(decimal2)
        break
      case 'pow': // 幂运算
        result = decimal1.pow(decimal2)
        break
      default:
        throw new Error(`不支持的运算类型: ${operation}`)
    }

    // 如果指定了精度，则保留对应的小数位
    if (typeof precision === 'number') {
      return Number(result.toFixed(precision))
    }

    // 返回结果（默认全局精度）
    return result.toNumber()
  } catch (error) {
    console.error('高精度运算错误:', error.message)
    throw error
  }
}
export function formatNumber(num) {
  console.log(num, 'num');
  
  // 确保输入值是有效的数字
  if (num === undefined || num === null || isNaN(num)) {
    return '0' // 若无效，返回默认值
  }

  // 如果输入是字符串，尝试转换为数字
  if (typeof num === 'string') {
    num = parseFloat(num) // 转换为浮点数
  }

  const units = [
    { value: 1e9, suffix: 'B' }, // 十亿
    { value: 1e6, suffix: 'M' }, // 百万
    { value: 1e3, suffix: 'K' }, // 千
  ]

  // 处理绝对值小于 1 的小数，只有当小数点后面有3个或更多连续的0时才使用 0.0{n}rest 格式
  if (Math.abs(num) < 1) {
    if (num === 0) return '0'
    const isNegative = num < 0
    // 使用 toFixed 避免科学计数法，确保得到 0.00000037 格式
    const absStr = new Decimal(Math.abs(num)).toFixed(20)
    const match = absStr.match(/^0\.(0+)(\d[\d]*)$/)
    if (match) {
      const zeroCount = match[1].length
      // 只有当连续0的个数大于等于3时才使用特殊格式
      if (zeroCount >= 3) {
        // 只保留有效数字，去掉尾随的零
        const restDigits = match[2].replace(/0+$/, '')
        return `${isNegative ? '-' : ''}0.0{${zeroCount}}${restDigits}`
      }
    }
    // 兜底：保留最多 8 位小数（去掉多余 0）
    const fixed = new Decimal(Math.abs(num)).toFixed(8)
    const trimmed = fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1')
    return `${isNegative ? '-' : ''}${trimmed}`
  }

  for (const unit of units) {
    if (num >= unit.value) {
   
      
      return (num / unit.value).toFixed(1) + unit.suffix
    }
  }

  return num.toString() // 默认返回原始值
}
// 配置全局精度和舍入模式（可根据需要调整）
Decimal.set({
  precision: 20, // 默认保留 20 位精度
  rounding: Decimal.ROUND_HALF_UP, // 默认四舍五入
})
