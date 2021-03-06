import React from 'react';
import '../css/style.css';
import * as userService from '../service/userService';;
class Logo extends React.Component{
    constructor() {
        super();
        this.state={
            name:"BOOKSTORE",
            site:"#"
        }
    }
    render(){
        return(
          <h1 id="logo">
              <a href={this.state.site}>{this.state.name}</a>
          </h1>
        );
    }

}
function Cartinner(props){
    return<span>
            {props.name}
        <strong>{props.value}</strong>
    </span>
}


class Cart extends React.Component{
    constructor() {
        super();
        this.state = {
            cart_site:"/cart"
        }
    }
        render(){
            return(
            <div id="cart">
               <a href={this.state.cart_site} class="cart-link">我的购物车</a>
                <div className="cl">&nbsp;</div>
                {/*<Cartinner name="Articals" value="4"/>*/}
                {/*<span>"&nbsp;&nbsp;"</span>*/}
                {/*<Cartinner name="Cost" value="￥123.4"/>*/}
            </div>

            );
        }
    }

   export class Ulinner extends React.Component{
    constructor(props) {
        super(props);
        this.url=props.url;
        this.name=props.name;
    }
    render(){
    return <li>
        <a href={this.url}>{this.name}</a>
    </li>}
    }
  class Midheader extends React.Component{
    constructor() {
        super();
    }

    render(){
        const user=JSON.parse(localStorage.getItem("user"));
        console.log("user"+user);
        if(user!=null){
            if(user.userType==0) {
                return (
                    <div id="navigation">
                        <ul>
                            <Ulinner name={"你好  " + user.username} url="#"/>
                            <Ulinner name="我的订单" url="/order"/>
                            <Ulinner name="主页" url="/home"/>
                            <Ulinner name="统计" url="/analysis"/>
                            <button onClick={userService.logout}>退出登录</button>
                        </ul>
                    </div>
                );
            }
            else {
                return (
                    <div id="navigation">
                        <ul>
                            <Ulinner name={"你好,管理员大哥" + user.username} url="#"/>
                            <Ulinner name={"书籍管理页面"} url="/bookadmin"/>
                            <Ulinner name={"用户管理页面"} url="/useradmin"/>
                            <Ulinner name={"订单管理页面"} url="/orderadmin"/>
                            <Ulinner name="统计" url="/analysis"/>
                            <Ulinner name="主页" url="/home"/>
                            <button onClick={userService.logout}>退出登录</button>
                        </ul>
                    </div>
                );
            }
    }
    else{
        return(
            <div id="navigation">
                <ul>
                    <Ulinner name="主页" url="/home" />
                    <Ulinner name="登录" url="/login"/>
                </ul>
            </div>
        );
        }}

  }
export  class Head extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div id="header">
            <Logo/>
            <Cart/>
            <Midheader/>
            </div>
        );
    }
  }