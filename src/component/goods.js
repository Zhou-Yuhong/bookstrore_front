import React from 'react';
import  {Head} from "./header";
import '../css/style.css';
const book_modle={
    name:"活着",writer:"余华",price:"23.3",
    intro:"身处荒诞的世界，每个人都该读读余华。经典版本，带你读懂“活着”的力量"
}
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
        this.state={
            book:book_modle,
            pieces:1
        }
    }
    addpieces=(e)=>{
        let num=this.state.pieces;
        num++;
        this.setState(
            {pieces:num}
        )

    }
    subpieces=(e)=>{
        if(this.state.pieces===1) return;
        let num=this.state.pieces;
        num--;
        this.setState(
            {pieces:num}
        )

    }
    render() {
        return(
            <div className="shell">
                <Head/>
                <Goodsclassify  data="名家经典" data2="活着"/>
                <Goods_pic src="img/alive.jpg"/>

                <div className="goods_inf">
                    <h3>
                        {this.state.book.name}  {this.state.book.writer}
                    </h3>
                    <p>
                        {this.state.book.intro}
                    </p>
                    <div >
                        <div className="pricebar">
                            <ul>
                                <li><h3>￥{this.state.book.price}</h3></li>
                                <li>数量</li>
                                <li className="num_li">
                                    <button onClick={this.subpieces}> -</button>
                                    <input value={this.state.pieces}/>
                                    <button onClick={this.addpieces}>+</button>
                                </li>
                            </ul>
                        </div>
                        <div className="totle">
                            总价
                            <em>￥{this.state.book.price*this.state.pieces}</em>
                        </div>
                        <div className="operate_btn">
                            <a href="" className="btn">立即购买</a>
                            <a href="" className="btn">加入购物车</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
