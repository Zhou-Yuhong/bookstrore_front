import '../css/style.css';
import React from 'react';
import {Side_full,MoreProduct,Bottom_cols,Footer} from "./bottom.js";
import {Head}  from "./header.js";
import {Content,Slider,Sidebar,Product} from "./mainpart.js";

export class Home extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
        <div className="shell">
            <Head/>
            <Content/>
            <Side_full/>
            <Footer/>
        </div>);

    }
}
export class Home2 extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div className="shell">

         {/*       <div id="header">*/}
         {/*           <h1 id="logo">*/}
         {/*               <a href="#">BOOKSTORE</a>*/}
         {/*           </h1>*/}

         {/*           <div id="cart">*/}
         {/*               <a href="cart.html" className="cart-link">Your Shopping Cart</a>*/}
         {/*               <div className="cl">&nbsp;</div>*/}
         {/*               <span>*/}
         {/*    "Articals:"*/}
         {/*    <strong>4</strong>*/}
         {/*</span>*/}
         {/*               "&nbsp;&nbsp;"*/}
         {/*               <span>*/}
         {/*   "Cost:"*/}
         {/*   <strong>￥123.4</strong>*/}
         {/*</span>*/}
         {/*           </div>*/}

         {/*           <div id="navigation">*/}
         {/*               <ul>*/}
         {/*                   <li>*/}
         {/*                       <a href="#" className="active">主页</a>*/}
         {/*                   </li>*/}
         {/*                   <li>*/}
         {/*                       <a href="#">分类</a>*/}
         {/*                   </li>*/}
         {/*                   <li>*/}
         {/*                       <a href="#">我的</a>*/}
         {/*                   </li>*/}
         {/*                   <li>*/}
         {/*                       <a href="#">店铺</a>*/}
         {/*                   </li>*/}
         {/*               </ul>*/}
         {/*           </div>*/}

         {/*       </div>*/}
                <Head/>
                <div id="main">
                    <div className="cl">&nbsp;</div>

                    <div id="content">

                        {/*<div id="slider" className="box">*/}
                        {/*    <div id="slider-holder">*/}
                        {/*        <ul>*/}
                        {/*            <li><a href="#"><img src="img/slide1.jpg" alt=""/></a></li>*/}
                        {/*            <li><a href="#"><img src="img/slide2.jpg" alt=""/></a></li>*/}
                        {/*            <li><a href="#"><img src="img/slide3.jpg" alt=""/></a></li>*/}
                        {/*            <li><a href="#"><img src="img/slide4.jpg" alt=""/></a></li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*    <div id="slider-nav">*/}
                        {/*        <a href="#" className="active">1</a>*/}
                        {/*        <a href="#">2</a>*/}
                        {/*        <a href="#">3</a>*/}
                        {/*        <a href="#">4</a>*/}
                        {/*    </div>*/}

                        {/*</div>*/}
                        <Slider/>
                        {/*<div className="products">*/}
                        {/*    <div className="cl">&nbsp;</div>*/}
                        {/*    <ul>*/}
                        {/*        <li>*/}
                        {/*            <a href="#"><img src="img/threebody1.jpg" alt=""/></a>*/}
                        {/*            <div className="product-info">*/}
                        {/*                <h3>书本信息</h3>*/}
                        {/*                <div className="product-desc">*/}
                        {/*                    <h4>科幻系列</h4>*/}
                        {/*                    <p>三体1<br/>地球往事</p>*/}
                        {/*                    <strong className="price">￥23.33</strong>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a href="#"><img src="img/threebody2.jpg" alt=""/></a>*/}
                        {/*            <div className="product-info">*/}
                        {/*                <h3>书本信息</h3>*/}
                        {/*                <div className="product-desc">*/}
                        {/*                    <h4>科幻系列</h4>*/}
                        {/*                    <p>三体2<br/>黑暗森林</p>*/}
                        {/*                    <strong className="price">￥23.33</strong>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </li>*/}
                        {/*        <li className="last">*/}
                        {/*            <a href="#"><img src="img/threebody3.jpg" alt=""/></a>*/}
                        {/*            <div className="product-info">*/}
                        {/*                <h3>书本信息</h3>*/}
                        {/*                <div className="product-desc">*/}
                        {/*                    <h4>科幻系列</h4>*/}
                        {/*                    <p>三体3<br/>死神永生</p>*/}
                        {/*                    <strong className="price">￥23.33</strong>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*    <div className="cl">&nbsp;</div>*/}
                        {/*</div>*/}
                        <Product/>
                    </div>
                    <Sidebar/>
                    {/*<div id="sidebar">*/}
                    {/*    <div className="box search">*/}
                    {/*        <h2>*/}
                    {/*            筛选条件*/}
                    {/*            <span></span>*/}
                    {/*        </h2>*/}
                    {/*        <div className="box-content">*/}
                    {/*            <form action="" method="post">*/}

                    {/*                <label>关键词</label>*/}
                    {/*                <input type="text" className="field"/>*/}

                    {/*                <label>类别</label>*/}
                    {/*                <select className="field">*/}
                    {/*                    <option value="">-- 选择类别 --</option>*/}
                    {/*                </select>*/}

                    {/*                <div className="inline-field">*/}
                    {/*                    <label>Price</label>*/}
                    {/*                    <select className="field small-field">*/}
                    {/*                        <option value="">$10</option>*/}
                    {/*                    </select>*/}
                    {/*                    <label>to:</label>*/}
                    {/*                    <select className="field small-field">*/}
                    {/*                        <option value="">$50</option>*/}
                    {/*                    </select>*/}
                    {/*                </div>*/}

                    {/*                <input type="submit" className="search-submit" value="搜索"/>*/}

                    {/*                <p>*/}
                    {/*                    <a href="#" className="bul">Advanced search</a><br/>*/}
                    {/*                    <a href="#" className="bul">Contact Customer Support</a>*/}
                    {/*                </p>*/}

                    {/*            </form>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*    <div className="box categories">*/}
                    {/*        <h2>类别 <span></span></h2>*/}
                    {/*        <div className="box-content">*/}
                    {/*            <ul>*/}
                    {/*                <li><a href="#">教育</a></li>*/}
                    {/*                <li><a href="#">小说</a></li>*/}
                    {/*                <li><a href="#">文艺</a></li>*/}
                    {/*                <li><a href="#">青春文学</a></li>*/}
                    {/*                <li><a href="#">童书</a></li>*/}
                    {/*                <li><a href="#">人文社科</a></li>*/}
                    {/*                <li><a href="#">经管</a></li>*/}
                    {/*                <li><a href="#">科幻</a></li>*/}
                    {/*                <li><a href="#">Category 9</a></li>*/}
                    {/*                <li><a href="#">Category 10</a></li>*/}
                    {/*                <li><a href="#">Category 11</a></li>*/}
                    {/*                <li><a href="#">Category 12</a></li>*/}
                    {/*                <li className="last"><a href="#">Category 13</a></li>*/}
                    {/*            </ul>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}



                    {/*</div>*/}

                    <div className="cl">&nbsp;</div>
                </div>


                <div className="side-full">


                    {/*<div className="more-products">*/}
                    {/*    <div className="more-products-holder">*/}
                    {/*        <ul>*/}
                    {/*            <li><a href="#"><img src="img/small1.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small2.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small3.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small4.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small5.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small6.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small7.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small1.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small2.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small3.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small4.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small5.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small6.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small7.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small1.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small2.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small3.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small4.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small5.jpg" alt=""/></a></li>*/}
                    {/*            <li><a href="#"><img src="img/small6.jpg" alt=""/></a></li>*/}
                    {/*            <li className="last"><a href="#"><img src="img/small7.jpg" alt=""/></a></li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*    <div className="more-nav">*/}
                    {/*        <a href="#" className="prev">previous</a>*/}
                    {/*        <a href="#" className="next">next</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <MoreProduct/>
                    <div className="cols">
                        <div className="cl">&nbsp;</div>
                        <div className="col">
                            <h3 className="ico ico1">Donec imperdiet</h3>
                            <p>广告位招租</p>
                            <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
                        </div>
                        <div className="col">
                            <h3 className="ico ico2">Donec imperdiet</h3>
                            <p>广告位招租</p>
                            <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
                        </div>
                        <div className="col">
                            <h3 className="ico ico3">Donec imperdiet</h3>
                            <p>广告位招租</p>
                            <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
                        </div>
                        <div className="col col-last">
                            <h3 className="ico ico4">Donec imperdiet</h3>
                            <p>广告位招租.</p>
                            <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
                        </div>
                        <div className="cl">&nbsp;</div>
                    </div>


                </div>



                <div id="footer">
                    <p className="left">
                        <a href="#">Home</a>
                        <span>|</span>
                        <a href="#">Support</a>
                        <span>|</span>
                        <a href="#">My Account</a>
                        <span>|</span>
                        <a href="#">The Store</a>
                        <span>|</span>
                        <a href="#">Contact</a>
                    </p>
                    <p className="right">
                        &copy; 2010 Shop Around.
                        Design by <a href="http://chocotemplates.com" target="_blank"
                                     title="The Sweetest CSS Templates WorldWide">Chocotemplates.com</a>
                    </p>
                </div>



            </div>);

    }
}