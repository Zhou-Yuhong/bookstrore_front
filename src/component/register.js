import React from 'react';
import {Inputbox,Submit} from "./login.js";
import '../css/login.css';
export class Register extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
          <div className="loginbox" style={
              {
                  height:400,
                  backgroundImage:"url"+require("../img/login_background.jpg")+")"
              }
          }>
              <h2>注册</h2>
              <form className="form-box">
                  <div className="inputBox">
                      <input type="text" name required/>
                      <label>输入邮箱</label>
                  </div>
                  <div className="inputBox">
                      <input type="password" name required/>
                      <label>输入密码</label>
                  </div>
                  <div className="inputBox">
                      <input type="password" name required/>
                      <label>确认密码</label>
                  </div>
                 <input  type="submit" name value="注册" style={
                     {

                         margin_left:"50%",
                         color:'red'
                     }
                 }
                 />
              </form>

          </div>
        );
    }


}