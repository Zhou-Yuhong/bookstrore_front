import '../css/style.css';
import React from 'react';
import {Side_full,MoreProduct,Bottom_cols,Footer} from "./bottom.js";
import {Head}  from "./header.js";
import {Content,Slider,Sidebar,Product} from "./mainpart.js";
import * as userService from "../service/userService";

export class Home extends React.Component{
    constructor() {
        super();
    }
    // checkAuth = (data) => {
    //
    //     if (data.status >= 0) {
    //         this.setState({isAuthed: true, hasAuthed: true});
    //         const user=JSON.parse(localStorage.getItem("user"));
    //         if(user==null){
    //             localStorage.setItem("user",JSON.stringify(data.auth));
    //         }
    //         console.log(data);
    //     } else {
    //         // message.error(data.msg);
    //         //TODO 信息处理
    //         localStorage.removeItem('user');
    //         this.setState({isAuthed: false, hasAuthed: true});
    //     }
    // };
    // componentDidMount() {
    //     userService.checkSession(this.checkAuth);
    // }
    render(){
        const user=JSON.parse(localStorage.getItem("user"));
        console.log("user"+user);
        return(
        <div className="shell">
            <Head/>
            <Content/>
        </div>);

    }
}
