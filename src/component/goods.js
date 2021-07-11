import React from 'react';
import  {Head} from "./header";
import '../css/style.css';
import {getBook} from "../service/bookService";
import {Button,Input} from'antd';
import {Tooltip} from "antd/es";
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
            num:1
        }
    }
    componentDidMount(){
        const callback =  (data) => {
            console.log(data);
            this.setState({book:data});
        };
        getBook(this.getIdByurl(),callback)
        //console.log(this.getIdByurl());
    }
  getIdByurl=()=>{
        var search=this.props.location.search;	//获取location的search属性，保存在search中
        var params={};		//创建空对象params
        if(search!=""){		//如果search不是空字符串
            search.slice(1).split("&").forEach(	//?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
                function(val){
                    var arr=val.split("=");		//将当前元素值按=切割，保存在arr中
                    params[arr[0]]=parseInt(arr[1]);		//向params中添加一个元素,属性名为arr[0],值为arr[1]
                }
            );
        }
        return params;
    }
    addpieces=(e)=>{
        let num=this.state.num;
        num++;
        this.setState(
            {num:num}
        )

    }
    subpieces=(e)=>{
        if(this.state.num===1) return;
        let num=this.state.num;
        num--;
        this.setState(
            {num:num}
        )
    }
    addTocart=(e)=>{
        console.log(localStorage.getItem("user"));
        let k=0;
        let gift={
            id:this.state.book.id,
            isbn:this.state.book.isbn,
            name:this.state.book.name,
            type:this.state.book.type,
            author:this.state.book.author,
            price:this.state.book.price,
            num:this.state.num,
            image:this.state.book.image,
            if_chosen:false
        }
        let cart=localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart")) : [];
        for(let i=0;i<cart.length;i++){
            let item=cart[i];
            if(item.id==gift.id){
                item.num+=gift.num;
            }else{
                k++;
            }
        }
        if(k==cart.length){
            cart.push(gift);
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("加入购物车成功");
    }
    render() {
        return(
            <div className="shell">
                <Head/>
                <div className="goods_classify">
                    <a href=" ">全部分类</a>
                    <span>></span>
                    <a href=" ">{this.state.book.type}</a>
                    <span>></span>
                    <a href=" ">{this.state.book.name}</a>
                </div>
                <div className="goods_pic">
                    <img src={this.state.book.image}  />
                </div>

                <div className="goods_inf">
                    <h3>
                        {this.state.book.name} <br/><br/><br/> {this.state.book.author}
                    </h3>
                    <p>
                        {this.state.book.description}
                    </p>
                    <div >
                        <div className="pricebar">
                            <ul>
                                <li><h3>￥{this.state.book.price}</h3></li>
                                <li>数量</li>
                                <li className="num_li">
                                    <Button onClick={this.subpieces}   size="small"
                                            style={{ width: 50 }}> -</Button>
                                    {/*<input value={this.state.num}/>*/}
                                    <Tooltip>{this.state.num}</Tooltip>
                                    <Button onClick={this.addpieces}   size="small"
                                            style={{ width: 50
                                            }}>+</Button>
                                </li>
                            </ul>
                        </div>
                        <div className="totle">
                            总价
                            <em>￥{this.state.book.price*this.state.num}</em>
                        </div>
                        <div className="operate_btn">
                            <button  className="btn">立即购买</button>
                            <button onClick={this.addTocart} className="btn">加入购物车</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
