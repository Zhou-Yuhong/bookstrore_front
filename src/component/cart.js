import '../css/cart.css';
import React from 'react';
import  {Head} from './header';
import {setOrders} from "../service/orderService";

const cart_book1={
    src:"img/cart_book1.jpg",name:"骆驼祥子",writer:"老舍",piece:1,money:20.3,if_chosen:false,cart_id:0
}
const cart_book2={
    src:"img/cart_book2.jpg",name:"汤姆索亚历险记",writer:"马克吐温",piece:1,money:20.3,if_chosen:false,cart_id:1
}
const cart_book3={
    src:"img/cart_book3.jpg",name:"海底两万里",writer:"儒勒.凡尔赛",piece:1,money:20.3,if_chosen:false,cart_id:2
}
const book_list=[
  cart_book1,cart_book2,cart_book3
];
function creat_order_product(product_id,num){
     var order_product=new Object();
     order_product.product_id=product_id;
     order_product.num=num;
     return order_product;
}
class Searchdiv extends React.Component{
    constructor() {
        super();
        this.state={
            str:""
        }
    }
    searchdiv_search=(e)=>{
        // this.props.parent.search_book(e.target.value);
        this.props.parent.search_book(this.state.str);
    }
    searchdiv_getstr=(e)=>{
        if(e.target.value===""){
            this.props.parent.clear_search();
        }
        this.setState(
            {str:e.target.value}
        )
    }
    render(){
        return(
            <div className="search_div">
            <input type="text"
                   onChange={this.searchdiv_getstr}
                   className="search_text"/>
            <input type="button"
                   onClick={this.searchdiv_search}
                   value="搜索" className="search_but"/>
            </div>
        );
    }
}
class Deliver extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div className="title warp">
                <h3>全部商品</h3>
            <div>

                <span>配送到</span>

                <select>
                    <option>闵行区</option>

                    <option>松江区</option>

                    <option>宝山区</option>

                    <option>嘉定区</option>

                    <option>奉贤区</option>


                </select>

            </div>
            </div>
        );
    }
}
class Menue extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div className="tips warp">

                <ul>
                    <li>
                        <input type="checkbox"/>
                        全选
                    </li>
                    <li>商品</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>


            </div>
        );
    }
}
class Infowarp extends React.Component{
    constructor(props) {
        super(props);
        // this.src=props.src;
        // this.data=props.data;
        // this.data2=props.data2;
        // this.data3=props.data3;
    }
    handle_reverse_choose=(e)=>{
        this.props.parent.reverse_choose(this.props.book.id);
    }
    handle_remove_book=(e)=>{
        console.log(this.props.book.id);
        this.props.parent.remove_book(this.props.book.id);
    }
    handle_change_booknum=(e)=>{
        let tmp=e.target.value;
        let pro=0;
        if(tmp==='add') pro=0;
        else pro=1;
        this.props.parent.change_booknum(pro,this.props.book.id);
    }

    render(){
        return(
            <div className="info warp">

                <ul>
                    <li className="info_1"><input type="checkbox"
                    checked={this.props.book.if_chosen}
                    onChange={this.handle_reverse_choose}
                    /></li>
                    <li className="info_2"><img src={this.props.book.image} width="80px"/></li>
                    <li className="info_3"><a href={"/goods?id="+this.props.book.id}>{this.props.book.name}</a></li>
                    <li className="info_4"><a>作者：{this.props.book.author}</a></li>
                    <li className="info_5">￥{this.props.book.price}</li>
                    <li className="info_6">
                        <button value={'sub'} onClick={this.handle_change_booknum}>-</button>
                        <input type="text" name="" id="" value={this.props.book.num}/>
                        <button className="bot" value={'add'} onClick={this.handle_change_booknum}>+</button>

                    </li>
                    <li className="info_7">￥{this.props.book.price*this.props.book.num}</li>
                    <li>
                        <a onClick={this.handle_remove_book}>删除</a><br/>

                    </li>
                </ul>


            </div>
        );
    }
}
class Allbooks extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
           <div>
             <Infowarp src="img/cart_book1.jpg" data="骆驼祥子" data2="老舍" data3="20.3"/>
             <Infowarp src="img/cart_book2.jpg" data="汤姆索亚历险记" data2="老舍" data3="20.3"/>
             <Infowarp src="img/cart_book3.jpg" data="海底两万里" data2="儒勒.凡尔赛" data3="20.5"/>
           </div>
        );
    }
}
class Payline extends React.Component{
    constructor(props) {
        super();
    }
    payline_select_all=(e)=>{
        this.props.parent.reverse_all_choose();
    }
    payline_remove_select_book=(e)=>{
        this.props.parent.remove_select_book();
    }
    payline_itemnum=()=>{
        let count=0;
        for(var i=0;i<this.props.book_array.length;i++){
            if(this.props.book_array[i].if_chosen) count++;
        }
        return count;
    }
    payline_sum=()=>{
        let sum=0;
        sum=this.props.sum;
        return sum;
    }
    submit_order=(event)=>{
        const order=JSON.parse(localStorage.getItem("cart"));
        const user=JSON.parse(localStorage.getItem("user"));
        console.log(user);
        let totle=0;
        let sum=0;
        let state=0;
        let order_products=[];
        for(let i=order.length-1;i>=0;i--){
            if(order[i].if_chosen){
                var order_product=creat_order_product(order[i].id,order[i].num,);
                order_products.push(order_product);
                totle++;
                sum+=order[i].num*order[i].price;
                order.splice(i,1);
            }
        }
        localStorage.setItem("cart",JSON.stringify(order));
        //获取当前时间
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        // if (month < 10) {
        //     month = "0" + month;
        // }
        // if (day < 10) {
        //     day = "0" + day;
        // }
        let nowDate = year + "年" + month + "月" + day+"日";
        let order_info={
            userid:user.userId,
            order_time:nowDate,
            num:totle,
            value:sum,
            state:0
        }
        let data={
            order_info:order_info,
            order_products:order_products
        }
        // for(let j=0;j<totle;j++){
        //     data["product_id"+j]=order_products[j].product_id;
        //     data["name"+j]=order_products[j].name;
        //     data["num"+j]=order_products[j].num;
        //     data["price"+j]=order_products[j].price;
        //     data["image"+j]=order_products[j].image;
        //     data["author"+j]=order_products[j].author;
        // }
        console.log(data);
        const callback=()=>{
            let accc=2333;
        }
        setOrders(data,callback);
        alert("订单已提交");
    }

    render(){
        return(
            <div className="balance warp">

                <ul className="balance_ul1">
                    <li>

                        <input type="checkbox"
                               checked={this.props.choose_all}
                               onChange={this.payline_select_all}
                               name="" id="" value=""/>
                        全选
                    </li>
                    <li><a onClick={this.payline_remove_select_book}>删除选中商品</a></li>
                </ul>

                <ul className="balance_ul2">

                    <li>已经选择<span>{this.payline_itemnum()}</span>件商品</li>
                    <li>总价 <span>￥{this.props.sum}</span></li>
                    <li>
                        <button onClick={this.submit_order} className="butt">去结算</button>

                    </li>

                </ul>


            </div>
        );
    }
}
export class Cart extends React.Component{
     constructor() {
         super();
         this.state={
             choose_all:false,
             book_array:[],
             sum:0,    //总价
             search:false,//是否处于搜索状态
             search_array:[], //搜索结果的数组

         }
     }
     componentDidMount() {
         let cart=localStorage.getItem("cart")
         ? JSON.parse(localStorage.getItem("cart")) : [];
         this.setState({
             book_array:cart,
         });

     }

    //计算总价以及数量
     check_out=()=>{
         let totle=0;
         let tmp_book_array=this.state.book_array;
         tmp_book_array.map((it)=>{
             if(it.if_chosen==true){
                 totle+=it.price*it.num;

             }
         })
         totle=totle.toFixed(2);
         this.setState(
             {sum:totle},
         );
        return totle;
     }
     //改变是否全选
     reverse_all_choose=()=>{
         let if_choose_all=!this.state.choose_all;
         this.setState(
             {choose_all:if_choose_all}
         );
         let tmp_cart=this.state.book_array;
         tmp_cart.map(
             (it)=>{
                 it.if_chosen=if_choose_all;
             }
         );
         this.setState(
             {
                 book_array:tmp_cart
             },
             ()=>{
                 this.check_out();
             }
         );
         //更新localstorage
         localStorage.setItem("cart",JSON.stringify(this.state.book_array));
     }
     //改变一个商品的选择状态，并反馈
     reverse_choose=(cart_id)=>{
         let tmp_cart=this.state.book_array;
         tmp_cart.map((it)=>{
             if(cart_id==it.id){
                 let chosen2=!it.if_chosen;
                 it.if_chosen=chosen2;
             }
         });
         //改变state
         this.setState(
             {book_array:tmp_cart},
             ()=>{
              this.check_out();
             }
         );
         //更新localstorage
         localStorage.setItem("cart",JSON.stringify(this.state.book_array));
     }
     //删除单个book
     remove_book=(cart_id)=>{

       let tmp_cart=this.state.book_array;
       let filter_cart=tmp_cart.filter(item => item.id != cart_id);
       this.setState(
           {book_array:filter_cart},
           ()=>{
               this.check_out();
           }
       );
         //更新localstorage
         localStorage.setItem("cart",JSON.stringify(this.state.book_array));
    }
    //删除选中book
    remove_select_book=()=>{
         let tmp_cart=this.state.book_array;
         let filter_cart=tmp_cart.filter(it => !it.if_chosen);
         this.setState(
             {book_array:filter_cart},
             ()=>{
                 this.check_out();
             }
         );
        //更新localstorage
        localStorage.setItem("cart",JSON.stringify(this.state.book_array));
    }
    //增加减少book数量,choose为0，加1；choose为1，减1
    change_booknum=(choose,id)=>{
    let tmp_cart=this.state.book_array;
    for(let i=0;i<tmp_cart.length;i++){
        if(id==tmp_cart[i].id){
            if(choose==0){
                tmp_cart[i].num++;
            }
            else if(choose==1&&tmp_cart[i].num>0){
                tmp_cart[i].num--;
                if(tmp_cart[i].num==0){
                    //splice函数，删除数组元素
                    tmp_cart.splice(i,1);
                }
            }
            break;
        }
    }
    this.setState(
        {book_array:tmp_cart},
        ()=>{this.check_out();}
    );
        //更新localstorage
        localStorage.setItem("cart",JSON.stringify(this.state.book_array));
}
//搜索功能
search_book=(str)=>{
         if(str===""){
             this.setState(
                 {search:false}
             )
             console.log(this.state.search);
             return;
         }
         let tmp_cart=this.state.book_array;
         let filter_cart=tmp_cart.filter((it)=>it.name.search(str)!==-1);
         this.setState(
             {
                 search:true,
                 search_array:filter_cart
             }
         )
    console.log(this.state.search);
}
clear_search=()=>{
     this.setState(
         {
             search:false
         }
     )
}
//render所有的book（返回数组）
    render_allbook=(books)=>{

        let book_all=[];

        for(var i=0;i<books.length;i++){
            // console.log(books[i].name);
            book_all.push(
                <Infowarp
               book={books[i]}
               parent={this}
            />

            )
        }

        // console.log(book_all)
        return book_all;
    }
     render(){
         return(
          <div>
             <Head/>
             <Searchdiv parent={this}/>
             <Deliver/>
             <Menue/>
              {
                  (!this.state.search)?(

                          <div >
                              {this.render_allbook(this.state.book_array)}
                          </div>

                  ):(

                          <div>
                              {
                                  this.render_allbook(this.state.search_array)
                              }
                          </div>

                  )
              }
             <Payline parent={this} sum={this.state.sum} choose_all={this.state.choose_all}
                      book_array={this.state.book_array}/>

          </div>);

     }
}