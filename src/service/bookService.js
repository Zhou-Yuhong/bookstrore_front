
import {postRequest, postRequest_v2} from "../utils/ajax";
const  apiUrl='http://localhost:8080';
//const  apiUrl='http://192.168.31.15:8080';
export const getBooks = (data, callback) => {
    const url = `${apiUrl}/getBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    console.log(id);
    if(typeof id=='number'){
    const data = {id: id};
    const url = `${apiUrl}/getBook`;
    postRequest_v2(url, data, callback);}
    else{
        const url = `${apiUrl}/getBook`;
        postRequest_v2(url, id, callback);}
};
//提交删除书本请求
export const deleteBooks=(data,callback)=>{
   const url=`${apiUrl}/deleteBooks`;
   console.log(data);
   postRequest(url,data,callback);
};
//提交增加书籍请求
export const addBooks=(data,callback)=>{
   const url=`${apiUrl}/addBooks`;
   postRequest(url,data,callback);
};
//提交更新书籍请求
export const updateBooks=(data,callback)=>{
    const url=`${apiUrl}/updateBooks`;
    postRequest(url,data,callback);
}