import React from 'react';
import '../css/style.css';
import {Ulinner} from "./header";
import {Side_full} from "./bottom.js"
class Searchbox extends React.Component{
    render(){
        return <div className="box search">
            <h2>
                筛选条件
                <span></span>
            </h2>
            <div className="box-content">
            <form action="" method="post">

                <label>关键词</label>
                <input type="text" className="field"/>

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

                <input type="submit" className="search-submit" value="搜索"/>

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
export class Emptyline extends React.Component{
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
//滑动栏
export class Slider extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div id="slider" className="box">
                <div id="slider-holder">
                    <ul>
                        <li><a href="#"><img src="img/slide1.jpg" alt=""/></a></li>
                        <li><a href="#"><img src="img/slide2.jpg" alt=""/></a></li>
                        <li><a href="#"><img src="img/slide3.jpg" alt=""/></a></li>
                        <li><a href="#"><img src="img/slide4.jpg" alt=""/></a></li>
                    </ul>
                </div>
                <div id="slider-nav">
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                </div>

            </div>
        );
    }
}
class Product_Info extends React.Component{
    constructor(props) {
        super(props);
        this.url=props.url;
        this.src=props.src;
        this.data=props.data;
        this.data2=props.data2;
        this.data3=props.data3;
        this.data4=props.data4
    }
    render(){
        return(
            <li>
                <a href={this.url}><img src={this.src} alt=""/></a>
            <div className="product-info">
               <h3>书本信息</h3>
                <div className="product-desc">
                    <h4>{this.data}</h4>
                    <p>{this.data2}<br/>{this.data3} </p>
                    <strong ClassName="price">￥{this.data4}</strong>
                </div>
            </div>
            </li>
        );
    }
}
class Product_Info_Last extends React.Component{
    constructor(props) {
        super(props);
        this.url=props.url;
        this.src=props.src;
        this.data=props.data;
        this.data2=props.data2;
        this.data3=props.data3;
        this.data4=props.data4
    }
    render(){
        return(
            <li className="last">
                <a href={this.url}><img src={this.src} alt=""/></a>
                <div className="product-info">
                    <h3>书本信息</h3>
                    <div className="product-desc">
                        <h4>{this.data}</h4>
                        <p>{this.data2}<br/>{this.data3} </p>
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
                <Emptyline/>
                <ul>
                <Product_Info url="#" src= {"img/threebody1.jpg"} data="科幻系列" data2="三体1" data3="地球往事" data4="23.33"/>
                <Product_Info url="#" src= {"img/threebody2.jpg"} data="科幻系列" data2="三体2" data3="黑暗森林" data4="23.33"/>
                <Product_Info_Last url="#" src= {"img/threebody3.jpg"} data="科幻系列" data2="三体3" data3="死神永生" data4="23.33"/>
                </ul>
                <Emptyline/>
                </div>
        );
    }
}
// class Product extends React.Component{
//     constructor(props) {
//         super(props);
//         this.url=props.url;
//         this.src=props.src;
//     }
//     render(){
//         return(
//             <li>
//                 <a href={this.url}><img src={this.src} alt="" /></a>
//                 <Product_Info data="科幻系列" data2="三体1" data3="地球往事" data4="23.3"/>
//
//             </li>
//         );
//     }
// }
// class Rightcon extends  React.Component{
//     constructor() {
//         super();
//     }
// }
export class Content extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div id="main">
                <div className="cl">&nbsp;</div>

                <div id="content">
                    <Slider/>
                    <Product/>
                </div>
                <Sidebar/>
                <div className="cl">&nbsp;</div>
            </div>
        );
    }
}


