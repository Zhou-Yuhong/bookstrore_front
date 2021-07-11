import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from "antd";

const  apiUrl='http://localhost:8080';
//const  apiUrl='http://192.168.31.15:8080';
export const login=(data)=>{
    console.log(data);
    const url=`${apiUrl}/login`;
    const callback =(data)=>{
        if(data.status>=0){
            console.log(data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
            const user=JSON.parse(localStorage.getItem("user"));

            console.log("接收到传回的data:"+data);
            console.log(data.msg);
            console.log(data.status);
            history.push("/");
            //TODO 增加message处理
            message.info("登录成功");
        }
        else if(data.status==-2){

            //TODO 增加message处理
            message.info("您的账号已被禁用");
        }
        else{
            message.info("登录失败");
        }
    };
    postRequest(url,data,callback);
};
export const register=(data)=>{
    const url=`${apiUrl}/register`;
    const callback=(data)=>{
        console.log(data);
        if(data==true){
            message.info("注册成功");
            history.push("/login");
        }
        else{
            message.info("注册失败，该用户名已存在");
        }

    }
    postRequest(url,data,callback);
}
export const CheckUsername=(data,callback)=>{
    const url=`${apiUrl}/checkUsername`;
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
           console.log("未退出");
        }
    };
    postRequest(url,{},callback);
}
export const checkSession =(callback)=>{

        const url = `${apiUrl}/checkSession`;
        postRequest(url, {}, callback);

}
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