import '../css/cart.css';
import React from 'react';
import  {Head} from './header';
class Searchdiv extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div className="search_div">
            <input type="text" className="search_text"/>
            <input type="button" value="搜索" className="search_but"/>
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
        this.src=props.src;
        this.data=props.data;
        this.data2=props.data2;
        this.data3=props.data3;
    }
    render(){
        return(
            <div className="info warp">

                <ul>
                    <li className="info_1"><input type="checkbox"/></li>
                    <li className="info_2"><img src={this.src} width="80px"/></li>
                    <li className="info_3"><a>{this.data}</a></li>
                    <li className="info_4"><a>作者：{this.data2}</a></li>
                    <li className="info_5">￥{this.data3}</li>
                    <li className="info_6">
                        <button>-</button>
                        <input type="text" name="" id="" value="1"/>
                        <button className="bot">+</button>

                    </li>
                    <li className="info_7">￥{this.data3}</li>
                    <li>
                        <a>删除</a><br/>
                        <a>已到我的关注</a>
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
        this.data=props.data;
        this.data2=props.data2;
    }
    render(){
        return(
            <div className="balance warp">

                <ul className="balance_ul1">
                    <li>

                        <input type="checkbox" name="" id="" value=""/>
                        全选
                    </li>
                    <li><a>删除选中商品</a></li>
                    <li><a>移到我的关注</a></li>
                    <li><a>清除下柜商品</a></li>
                </ul>

                <ul className="balance_ul2">

                    <li>已经选择<span>{this.data}</span>件商品</li>
                    <li>总价 <span>￥{this.data2}</span></li>
                    <li>
                        <button className="butt">去结算</button>

                    </li>

                </ul>


            </div>
        );
    }
}
export class Cart extends React.Component{
     constructor() {
         super();
     }
     render(){
         return(
          <div>
             <Head/>
             <Searchdiv/>
             <Deliver/>
             <Menue/>
             <Allbooks/>
             <Payline/>

          </div>);

     }
}