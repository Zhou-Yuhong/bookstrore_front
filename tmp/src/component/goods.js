import React from 'react';
import  {Head} from "./header";
import '../css/style.css';
class Goodsclassify extends React.Component{
    constructor(props) {
        super();
        this.data = props.data;
        this.data2 = props.data2;
    }
        render(){
            return(
                <div className="goods_classify">
                    <a href=" ">全部分类</a>
                    <span>></span>
                    <a href=" ">{this.data}</a>
                    <span>></span>
                    <a href=" ">{this.data2}</a>
                </div>
            );
        }
    }
class Goods_pic extends React.Component{
    constructor(props) {
        super(props);
        this.src=props.src;
    }
    render(){
        return(
            <div className="goods_pic">
                <img src={this.src}  />
                </div>
        );
    }
}
class Pricebar extends React.Component{
    constructor(props) {
        super(props);
        this.data=props.data;
        this.value=props.value;
        this.data2=props.data2;
    }
    render(){
        return(
            <div >
            <div className="pricebar">
                <ul>
                    <li><h3>￥{this.data}</h3></li>
                    <li>数量</li>
                    <li className="num_li">
                        <button> -</button>
                        <input value={this.value}/>
                            <button>+</button>
                    </li>
                </ul>
            </div>
                <div className="totle">
                    总价
                    <em>￥{this.data2}</em>
                </div>
                <div className="operate_btn">
                    <a href="" className="btn">立即购买</a>
                    <a href="" className="btn">加入购物车</a>
                </div>
            </div>
        );
    }
}
class Goods_inf extends React.Component{
    constructor(props) {
        super(props);
        this.data=props.data;
        this.data2=props.data2;

    }
    render() {
        return(
            <div className="goods_inf">
                <h3>
                    {this.data}
                </h3>
                <p>
                    {this.data2}
                </p>
                <Pricebar data="23.3" value="1" data2="23.3"/>
            </div>
        );
    }
}
export class Goods extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div className="shell">
                <Head/>
                <Goodsclassify/>
                <Goods_pic src="img/alive.jpg"/>
                <Goods_inf data="活着 余华" data2="身处荒诞的世界，每个人都该读读余华。经典版本，带你读懂“活着”的力量"/>

            </div>

        );
    }
}
