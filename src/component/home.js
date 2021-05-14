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
