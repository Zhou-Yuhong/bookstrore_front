import React from 'react';
import '../css/style.css';
import {Emptyline} from "./mainpart";
class Bottombook extends React.Component{
    constructor(props) {
        super(props);
        this.url=props.url;
        this.src=props.src;
    }
    // defaultProps={
    //     url:'#',
    //     src:'../img/small1.jpg'
    // }
    render() {
        return(
           <li>
               <a href="#"><img src={this.src}/></a>
           </li>
        );
    }
}
class Moreproduct_Holder extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div className="more-products-holder">
                <ul>
                    <Bottombook url="#" src="img/small1.jpg"/>
                    <Bottombook url="#" src="img/small2.jpg"/>
                    <Bottombook url="#" src="img/small3.jpg"/>
                    <Bottombook url="#" src="img/small4.jpg"/>
                    <Bottombook url="#" src="img/small5.jpg"/>
                    <Bottombook url="#" src="img/small6.jpg"/>
                    <Bottombook url="#" src="img/small7.jpg"/>
                    <Bottombook url="#" src="img/small1.jpg"/>
                    <Bottombook url="#" src="img/small2.jpg"/>
                    <Bottombook url="#" src="img/small3.jpg"/>
                    <Bottombook url="#" src="img/small4.jpg"/>
                    <Bottombook url="#" src="img/small5.jpg"/>
                </ul>
            </div>
        );
    }
}
class More_nav extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div className="more-nav">
                <a href="#" className="prev">previous</a>
                <a href="#" className="next">next</a>
            </div>
        );
    }
}
export  class MoreProduct extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div className="more-products">
                <Moreproduct_Holder/>
                <More_nav/>
            </div>
        );
    }

}
class Bottom_col extends React.Component{
    constructor(props) {
        super(props);
        this.data=props.data;
        this.data2=props.data2;
        this.data3=props.data3;
        this.url=props.url;

    }
    render(){
        return(
            <div className="col">
                <h3 className="ico ico1">{this.data}</h3>
                <p>{this.data2}</p>
                <p className="more"><a href={this.url} className="bul">{this.data3}</a></p>
            </div>
        );
    }
}
class Bottom_col_last extends React.Component{
    constructor(props) {
        super(props);
        this.data=props.data;
        this.data2=props.data2;
        this.data3=props.data3;
        this.url=props.url;
    }
    render(){
        return(
            <div className="col col-last">
                <h3 className="ico ico4">{this.data}</h3>
                <p>{this.data2}</p>
                <p className="more"><a href={this.url} className="bul">{this.data3}</a></p>
            </div>
        );
    }
}
export class Bottom_cols extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="cols">
                <div className="cl">&nbsp;</div>
                <Bottom_col url="#" data="Donec imperdiet" data2="广告位招租" data3="Lorem ipsum" />
                <Bottom_col url="#" data="Donec imperdiet" data2="广告位招租" data3="Lorem ipsum" />
                <Bottom_col url="#" data="Donec imperdiet" data2="广告位招租" data3="Lorem ipsum" />
                <Bottom_col_last url="#" data="Donec imperdiet" data2="广告位招租" data3="Lorem ipsum" />
                <div className="cl">&nbsp;</div>
            </div>
        );


    }
}
// <div className="cols">
//     <div className="cl">&nbsp;</div>
//     <div className="col">
//         <h3 className="ico ico1">Donec imperdiet</h3>
//         <p>广告位招租</p>
//         <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
//     </div>
//     <div className="col">
//         <h3 className="ico ico2">Donec imperdiet</h3>
//         <p>广告位招租</p>
//         <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
//     </div>
//     <div className="col">
//         <h3 className="ico ico3">Donec imperdiet</h3>
//         <p>广告位招租</p>
//         <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
//     </div>
//     <div className="col col-last">
//         <h3 className="ico ico4">Donec imperdiet</h3>
//         <p>广告位招租.</p>
//         <p className="more"><a href="#" className="bul">Lorem ipsum</a></p>
//     </div>
//     <div className="cl">&nbsp;</div>
// </div>
export class Side_full extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
            <div className="side-full">
             <MoreProduct/>
             <Bottom_cols/>

            </div>
        );
    }
}
export class Footer extends React.Component{
    constructor() {
        super();
    }
    render(){
        return(
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
        );
    }
}


