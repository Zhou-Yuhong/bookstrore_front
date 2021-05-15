import {postRequest, postRequest_v2} from "../utils/ajax";
const  apiUrl='http://localhost:8080';

export const getOrders = (username, callback) => {
    const url = `${apiUrl}/getOrders`;
    console.log("请求order"+url);
    postRequest(url,username,callback);
};
export const setOrders=(data,callback)=>{
    const url=`${apiUrl}/setOrders`;
    console.log("提交订单"+url);
    postRequest(url,data,callback);
}