/*  格式化 Date  */
export const formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/*  生成随机密码  */
export const randomPassword = (count = 6) => {
  let str = ''

  for (let i = 0; i < count; i++) {
    str += ~~(Math.random()*10)
  }

  return str
}

export default {
  formatDate,
  randomPassword
}