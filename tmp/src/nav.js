import React from 'react';
import './App.css';
import './css/style.css';
import {HashRouter, Route,BrowserRouter as Router} from 'react-router-dom';
import {Home,Home2} from "./component/home";
import {Login} from "./component/login"
import {Cart} from "./component/cart"
import {Goods} from "./component/goods"
export class Nav extends React.Component{
    constructor() {
        super();
    }

    render(){
        return(
            <Router>
                <div>
                    <Route exact={true} path={"/"} component={Login}/>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/cart"} component={Cart}/>
                    <Route path={"/goods"} component={Goods}/>
                </div>
            </Router>
        );
    }
}