import  '../css/login.css';
import React from 'react';
import {Link} from "react-router-dom";
import * as userService from '../service/userService'
import Nav from"../nav"
export class Inputbox extends React.Component{
    constructor(props) {
        super(props);
        this.data=props.data;
    }
    render(){
        return(
         <div className="inputBox">
             <input type="text" name required />
             <label>{this.data}</label>
         </div>
        );
    }
}
export class Submit extends React.Component{
    constructor(props) {
        super(props);
        this.value=props.value;
    }
    render(){
        return(
            <input type="submit" name value={this.value} />
        );
    }
}
class Formbox extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <form className="form-box">
                <div className="inputBox">
                    <input type="text" value={this.state.username} onChange={this.handle_input_username} name required />
                    <label>Username</label>
                </div>
                <div className="inputBox">
                    <input type="password" value={this.state.password}  onChange={this.handle_input_pwd}  name required />
                    <label>Password</label>
                </div>
                <Link to={"/home"}>
                <input type="submit" onClick={this.login_info} name value="登录" />
            </Link>
                <input type="submit" name value="注册" />
            </form>
        );
    }

}
export class Login extends  React.Component{
    constructor() {
        super();
        this.state={
            username:"",
            password:""
        }
    }
    handleSubmit =(event)=> {
        console.log("发送login请求");
      let values={
          username:this.state.username,
          password:this.state.password
      }
      // console.log(this.state.username);
      // console.log(this.state.password);
      // console.log(values);
      userService.login(values);
    };
    handleRegister=(event)=>{
        let values={
            username:this.state.username,
            password:this.state.password
        }
        userService.register(values);
    }

    handle_input_username=(event)=>{
       this.setState( {
           username:event.target.value
        });
    }
    handle_input_pwd=(event)=>{
        this.setState(
            {
           password:event.target.value
            }
        );
    }
    login_info=()=>{
        const {username,password}=this.state;
        console.log(username);
        console.log(password);
    }
    render(){
        return(
            <div className="loginbox" style={{
                height:400,
                backgroundImage:"url("+require("../img/login_background.jpg")+")"
            }}>

                <h2>Login</h2>
                <form className="form-box">
                    <div className="inputBox">
                        <input type="text" value={this.state.username} onChange={this.handle_input_username} name required />
                        <label>Username</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" value={this.state.password}  onChange={this.handle_input_pwd}  name required />
                        <label>Password</label>
                    </div>
                    <Link to={"/home"}>
                        <input type="submit" onClick={this.handleSubmit} name value="登录" />
                    </Link>
                    <Link to={"register"}>
                    <input type="submit" onClick={this.handleRegister} name value="注册" />
                    </Link>
                </form>
            </div>
        );
    }
}
