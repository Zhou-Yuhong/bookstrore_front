import React from 'react';
import '../css/style.css';

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
                <Cartinner name="Articals" value="4"/>
                <span>"&nbsp;&nbsp;"</span>
                <Cartinner name="Cost" value="￥123.4"/>
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
        return(
            <div id="navigation">
                <ul>
                 <Ulinner name="主页" url="#" />
                 <Ulinner name="分类" url="#" />
                 <Ulinner name="我的" url="#" />
                 <Ulinner name="店铺" url="#" />
                </ul>
           </div>
        );
    }
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