import {postRequest, postRequest_v2} from "../utils/ajax";
const  apiUrl='http://localhost:8080';

// export const getBooks = (data, callback) => {
//     const url = `${apiUrl}/getBooks`;
//     postRequest(url, data, callback);
// };
//发送获取个人在时间范围内的订单请求
export const getBP=(data,callback)=>{
    const url=`${apiUrl}/getBP`;
    postRequest(url,data,callback);
}
//发送获取时间范围内的书籍分析请求
export const getBA=(data,callback)=>{
    const url=`${apiUrl}/getBA`;
    postRequest(url,data,callback);
}
//发送获取时间范围内的用户分析请求
export const getUA=(data,callback)=>{
    const url=`${apiUrl}/getUA`;
    postRequest(url,data,callback);
}