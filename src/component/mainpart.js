import React from 'react';
import '../css/style.css';
import {Ulinner} from "./header";
import {getBooks} from "../service/bookService";
import {Side_full} from "./bottom.js"
import {Switch} from "react-router-dom";
// <Product_Info url="#" src= {"img/threebody1.jpg"} data="科幻系列" data2="三体1" data3="地球往事" data4="23.33"/>
const home_book1={
    url: "#",src:"img/threebody1.jpg",name1:"三体1" ,name2: "地球往事",writer:"刘慈欣",money:23.33,series:"科幻系列"
}
const home_book2={
    url: "#",src:"img/threebody2.jpg",name1:"三体2",name2:" 黑暗森林",writer:"刘慈欣",money:23.33,series:"科幻系列"
}
const home_book3={
    url: "#",src:"img/threebody3.jpg",name1:"三体3",name2:"死神永生",writer:"刘慈欣",money:23.33,series:"科幻系列"
}
const home_book4={
    url: "#",src:"img/threebody1.jpg",name1:"三体1", name2:"地球往事",writer:"刘慈欣",money:23.33,series:"科幻系列"
}
const home_book5={
    url: "#",src:"img/threebody2.jpg",name1:"三体2", name2:"黑暗森林",writer:"刘慈欣",money:23.33,series:"科幻系列"
}
const home_book6={
    url: "#",src:"img/threebody3.jpg",name1:"三体3",name2:"死神永生",writer:"刘慈欣",money:23.33,series:"科幻系列"
}
const book_list=[
    home_book1,home_book2,home_book3,home_book4,home_book5,home_book6
]
class Searchbox extends React.Component{
    constructor() {
        super();
        this.state={
            str:""
        }
    }
    searchbox_search=(e)=>{
        this.props.parent.search_book(this.state.str);
    }
    searchbox_getstr=(e)=>{
        if(e.target.value===""){
            this.props.parent.clear_search();
        }
        this.setState(
            {str:e.target.value}
        )

    }
    render(){
        return <div className="box search">
            <h2>
                筛选条件
                <span></span>
            </h2>
            <div className="box-content">
            <form action="" method="post">

                <label>关键词</label>
                <input type="text"
                       onChange={this.searchbox_getstr}
                       className="field"/>

                <label>类别</label>
                <select className="field">
                    <option value="">-- 选择类别 --</option>
                </select>

                <div className="inline-field">
                    <label>Price</label>
                    <select className="field small-field">
                        <option value="">$10</option>
                    </select>
                    <label>to:</label>
                    <select className="field small-field">
                        <option value="">$50</option>
                    </select>
                </div>

                <button type="button"
                       onClick={this.searchbox_search}
                        className="search-submit" >搜索</button>

                <p>
                    <a href="#" className="bul">Advanced search</a><br/>
                    <a href="#" className="bul">Contact Customer Support</a>
                </p>
            </form>
            </div>
        </div>
    }
}

class Catebox extends React.Component{
    render(){
      return(
          <div className="box categories">
              <h2>类别 <span></span></h2>
          <div className="box-content">
              <ul>
                 <Ulinner name="教育" url="#"/>
                  <Ulinner name="小说" url="#"/>
                  <Ulinner name="文艺" url="#"/>
                  <Ulinner name="青春文学" url="#"/>
                  <Ulinner name="童书" url="#"/>
                  <Ulinner name="人文社科" url="#"/>
                  <Ulinner name="经管" url="#"/>
                  <Ulinner name="科幻" url="#"/>
                  <Ulinner name="Category 9" url="#"/>
                  <Ulinner name="Category 10" url="#"/>
                  <Ulinner name="Category 11" url="#"/>
                  <Ulinner name="Category 12" url="#"/>
                  <li className="last"><a href="#">Category 13</a></li>
              </ul>
          </div>
          </div>
      );
    }
}
export class Sidebar extends React.Component{
    constructor() {
        super();
    }
    render() {
        return (
            <div id="sidebar">
            <Searchbox/>
            <Catebox/>
            </div>

    );
    }

}
export class Emptyline extends React.Component{   //把我坑死了
    constructor() {
        super();
    }
    render(){
        return(
          <div className="cl">
              &nbsp;
          </div>
        );
    }
}
const slider_srcs=[
    "img/slide1.jpg",
    "img/slide2.jpg",
    "img/slide3.jpg",
    "img/slide4.jpg"
];
const slider_urls=[
    "#",
    "#",
    "#",
    "#"
];
class Switch_button extends React.Component{
    constructor(props) {
        super(props);
        this.num=this.props.index;
    }
    Switch_index=(e)=>{
        this.props.change_index(this.num);
    }
       render(){
          return(
              <a  onClick={this.Switch_index}>{this.num+1}</a>
          );
        }

}
//滑动栏
export class Slider extends React.Component{
    constructor() {
        super();
        this.state={
            src_array:slider_srcs,
            url_array:slider_urls,
            index:0
        }
    }
    render_allbutton=()=>{
        let buttons=[];

        for(var i=0;1<4;i++){
            buttons.push(
                <Switch_button choose={false} url={this.state.url_array[i]} index={i}/>
            );
        }
        return buttons;
    }
    change_index=(num)=>{
        this.setState(
            {index:num}
        )
    }
    render(){
        return(
            <div id="slider" className="box">
                <div id="slider-holder">
                    <ul>

                        <li><a href={this.state.url_array[this.state.index]}><img src={this.state.src_array[this.state.index]} alt=""/></a></li>
                    </ul>
                </div>
                <div id="slider-nav">

                    <Switch_button  change_index={this.change_index}  index={0}/>
                    <Switch_button  change_index={this.change_index}  index={1}/>
                    <Switch_button  change_index={this.change_index}  index={2}/>
                    <Switch_button  change_index={this.change_index}  index={3}/>
                </div>

            </div>
        );
    }
}
class Product_Info extends React.Component{
    constructor(props) {
        super(props);
        this.id=this.props.book.id;
    }
    test(){
        console.log("111");
    }
    render(){
        return(
            <li>
                {/*<a href={this.props.book.url}><img src={this.props.book.src} alt=""/></a>*/}
                <a  href={"/goods?id="+this.id} className="product-img" ><img src={this.props.book.image} alt=""/></a>
                <div className="product-info">
                    <h3>书本信息</h3>
                    <div className="product-desc">
                        <h4>{this.props.book.type}</h4>

                        <p>{"作者"+this.props.book.author}<br/>{this.props.book.name} </p>
                        <strong ClassName="price">￥{this.props.book.price}</strong>
                    </div>
                </div>
            </li>
        );
    }
}
class Product_Info_Last extends React.Component{
    constructor(props) {
        super(props);
        // this.url=props.url;
        // this.src=props.src;
        // this.data=props.data;
        // this.data2=props.data2;
        // this.data3=props.data3;
        // this.data4=props.data4
    }
    render(){
        return(
            <li className="last">
                <a href={this.props.book.url}><img src={this.props.book.src} alt=""/></a>
                <div className="product-info">
                    <h3>书本信息</h3>
                    <div className="product-desc">
                        <h4>{this.props.book.series}</h4>
                        <p>{this.props.book.name1}<br/>{this.data3} </p>
                        <strong ClassName="price">￥{this.data4}</strong>
                    </div>
                </div>
            </li>
        );
    }
}
export class Product extends  React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div className="products">

                <ul>
                <Product_Info book={book_list[0]}/>
                {/*<Product_Info url="#" src= {"img/threebody2.jpg"} data="科幻系列" data2="三体2" data3="黑暗森林" data4="23.33"/>*/}
                {/*<Product_Info url="#" src= {"img/threebody2.jpg"} data="科幻系列" data2="三体2" data3="黑暗森林" data4="23.33"/>*/}
                {/*<Product_Info url="#" src= {"img/threebody2.jpg"} data="科幻系列" data2="三体2" data3="黑暗森林" data4="23.33"/>*/}
                {/*<Product_Info url="#" src= {"img/threebody2.jpg"} data="科幻系列" data2="三体2" data3="黑暗森林" data4="23.33"/>*/}
                {/*<Product_Info url="#" src= {"img/threebody2.jpg"} data="科幻系列" data2="三体2" data3="黑暗森林" data4="23.33"/>*/}
                </ul>

                </div>
        );
    }
}


//Content组件包括了左边栏
export class Content extends React.Component{
    constructor() {
        super();
        this.state={
            product_array:[],
            search:false,
            search_array:[],
            // search_lower_bound:0,
            // search_upper_bound:500
        }
    }
    componentDidMount() {

        const callback =  (data) => {
            //console.log(data);
            this.setState({product_array:data});
        };

        getBooks({"search":null}, callback);
        const user=JSON.parse(localStorage.getItem("user"));
        //console.log("内存的user"+user.username);
        //console.log(this.state.product_array)
        }
    //退出搜索模式
    clear_search=()=>{
        this.setState(
            {search:false}
        )
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
        let tmp_cart=this.state.product_array;
        let filter_cart=tmp_cart.filter((it)=>it.name1.search(str)!==-1||it.name2.search(str)!==-1);
        //tmp_cart=filter_cart.filter((it)=>it.money>=lower);
        //filter_cart=tmp_cart.filter((it)=>it.money<=upper);
        this.setState(
            {
                search:true,
                search_array:filter_cart
            }
        )
        console.log(this.state.search);
    }
    //显示所有书籍
    render_product=(books)=>{
        let bk_array=[];
        if(books===undefined) return;
        books.map(
            (it,index)=>{
                bk_array.push(
                    <Product_Info
                    book={it}
                    />
                )
            }
        );
        return bk_array;
    }

    render(){
        return(
            <div id="main">
                <div className="cl">&nbsp;</div>

                <div id="content">
                    <Slider/>
                    <div className="products">
                        <div className="cl">&nbsp;</div>
                        {/*<ul>*/}
                        {/*    {*/}
                        {/*        this.render_product(this.state.product_array)*/}
                        {/*    }*/}
                        {/*</ul>*/}
                        {
                            (!this.state.search) ? (
                                <ul>
                                    {
                                this.render_product(this.state.product_array)
                                   }
                                </ul>
                            ):(
                                <ul>
                                    {
                                        this.render_product(this.state.search_array)
                                    }
                                </ul>

                            )
                        }
                        <div className="cl">&nbsp;</div>
                    </div>
                </div>
                <div id="sidebar">
                    <Searchbox parent={this}/>
                    <Catebox/>
                </div>
                <div className="cl">&nbsp;</div>
            </div>
        );
    }
}


