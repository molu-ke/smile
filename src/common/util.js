/**
 * @desc  过滤器
 * @param {*} number 要格式化的数字 
 * @param {*} int    格式化多少位数
 */
function moneyFilter(number,int){
    return number.toFixed(int)
}


/**
 * @desc 判断用户是否在微信中打开
 * @return {Boolean} true是  false否
 */
function isWeiXin(){ 
    var ua = navigator.userAgent.toLowerCase(); 
    if(ua.indexOf('micromessenger') != -1) { 
        return true; 
    } else { 
        return false; 
    } 
}

export default{
    moneyFilter,
    isWeiXin
}