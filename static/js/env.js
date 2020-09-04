/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */
const baseUrl = '';
const routerMode = 'history';
const DEBUG = false;
const cancleHTTP = [];
if (process.env.NODE_ENV == 'development') {
    baseUrl = "http://61.incfotech.com/test";
    DEBUG = true;
}else if(process.env.NODE_ENV == 'testing'){
    baseUrl = "http://61.incfotech.com/test";
    DEBUG = false;
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "http://www.incfotech.com/hotel";
    DEBUG = false;
}
export{
    baseUrl,
    routerMode,
    DEBUG,
    cancleHTTP
}