import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
const  apiUrl='http://localhost:8080';
export const login=(data)=>{
    console.log(data);
    const url=`${apiUrl}/login`;
    const callback =(data)=>{
        if(data.status>=0){
            localStorage.setItem('user', JSON.stringify(data.data));
            console.log("接收到传回的data:"+data);
            console.log(data.msg);
            console.log(data.status);
            history.push("/");
            //TODO 增加message处理
        }
        else{
            //TODO 增加message处理
        }
    };
    postRequest(url,data,callback);
};
export const register=(data)=>{
    const url=`${apiUrl}/register`;
    const callback=(data)=>{
        history.push("/login");
    }
    postRequest(url,data,callback);
}
export const logout= () => {
    const url=`${apiUrl}/logout`;
    const callback=(data)=>{
        if(data.status>=0){
            console.log("退出登录");
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            history.push("/login");
            //TODO 增加message处理
        }
        else{
            //TODO 增加message处理

        }
    };
    postRequest(url,{},callback);
}
export const checkSession =(callback)=>{

        const url = `${apiUrl}/checkSession`;
        postRequest(url, {}, callback);

}
// export const getBooks = (data, callback) => {
//     const url = `${apiUrl}/getBooks`;
//     postRequest(url, data, callback);
// };
export const getUsers=(data,callback)=>{
    const url=`${apiUrl}/getUsers`;
    postRequest(url,data,callback);
}

export const disableUsers=(data,callback)=>{
    const url=`${apiUrl}/disableUsers`;
    postRequest(url,data,callback);
}

export const enableUsers=(data,callback)=>{
    const url=`${apiUrl}/enableUsers`;
    postRequest(url,data,callback);
}