import '../css/cart.css';
import React from 'react';
import {Head} from './header';
import {getBooks} from "../service/bookService";
import {getOrders} from "../service/orderService";
class Infowarp extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="info warp">

                <ul>

                    <li className="info_2"><img src={this.props.book.image} width="80px"/></li>
                    <li className="info_3"><a href={"/goods?id="+this.props.book.product_id}>{this.props.book.name}</a></li>
                    <li className="info_4"><a>作者：{this.props.book.author}</a></li>
                    <li className="info_5">￥{this.props.book.price}</li>
                    <li className="info_6">
                        {"数量"+this.props.book.num}
                    </li>
                    <li className="info_7">￥{this.props.book.price*this.props.book.num}</li>
                </ul>


            </div>
        );
    }
}
class SingleOrder extends React.Component{
    constructor() {
        super();
        this.order_info=this.props.order_wrap.order_info;
        this.order_products=this.props.order_wrap.order_products;
    }
    render_products=(products)=>{
        let products_all=[];
        for(var i=0;i<products.length;i++){
           products_all.push(
               <div className="info warp">

                   <ul>

                       <li className="info_2"><img src={products[i].image} width="80px"/></li>
                       <li className="info_3"><a href={"/goods?id="+products[i].product_id}>{products[i].name}</a></li>
                       <li className="info_4"><a>作者：{products[i].author}</a></li>
                       <li className="info_5">￥{products[i].price}</li>
                       <li className="info_6">
                           {"数量"+products[i].num}
                       </li>
                       <li className="info_7">￥{products[i].price*products[i].num}</li>
                   </ul>


               </div>
           )
        }
        return products_all
    }
    render(){
        return(
            <div>
                <div className="tips warp">

                    <ul>
                        <li>{"商品数"+this.order_info.num}</li>
                        <li>{"下单时间"+this.order_info.order_time}</li>
                        <li>{"总价"+this.order_info.value}</li>
                        <li>{"商品状态"+this.order_info.state}</li>
                    </ul>
                </div>
                {this.render_products(this.order_products)}
            </div>
        );
    }
}
export class Order extends React.Component{
    constructor() {
        super();
        this.state={
            product_wraps:[]
        }
    }
    componentDidMount() {

        const callback=(data)=>{
            console.log(data);
            this.setState({product_wraps:data});
        }
        const user=JSON.parse(localStorage.getItem("user"));

        let value={
            username:user.username
        }
        console.log(value);
        getOrders(value,callback);
    }
    render_products=(products)=>{
        let products_all=[];
        for(var i=0;i<products.length;i++){
            products_all.push(
                <div className="info warp">

                    <ul>

                        <li className="info_2"><img src={products[i].image} width="80px"/></li>
                        <li className="info_3"><a href={"/goods?id="+products[i].product_id}>{products[i].name}</a></li>
                        <li className="info_4"><a>作者：{products[i].author}</a></li>
                        <li className="info_5">￥{products[i].price}</li>
                        <li className="info_6">
                            {"数量"+products[i].num}
                        </li>
                        <li className="info_7">￥{products[i].price*products[i].num}</li>
                    </ul>


                </div>
            )
        }
        return products_all
    }
    render_orders=(orders)=>{
        let orders_all=[];
        for(var i=0;i<orders.length;i++){
            orders_all.push(
                <div>
                    <div className="tips warp">

                        <ul>
                            <li>{"商品数"+orders[i].order_info.num}</li>
                            <li>{"下单时间"+orders[i].order_info.order_time}</li>
                            <li>{"总价"+orders[i].order_info.value}</li>
                            <li>{"商品状态"+orders[i].order_info.state}</li>
                        </ul>
                    </div>
                    {this.render_products(orders[i].order_products)}
                </div>
            )
        }
        return orders_all;
    }
    render(){
        return(
            <div>
                <Head/>
                <div className="title warp">
                    <h3>全部订单</h3>
                </div>
                {this.render_orders(this.state.product_wraps)}
            </div>
        );
    }
}

