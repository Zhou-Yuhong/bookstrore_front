import React from 'react';
import './App.css';
import './css/style.css';
//import {HashRouter, Route,BrowserRouter as Router} from 'react-router-dom';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {Home,Home2} from "./component/home";
import {Login} from "./component/login"
import {Cart} from "./component/cart"
import {Goods} from "./component/goods"
import {Register} from "./component/register"
import {Admin} from "./component/admin"
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import {history} from "./utils/history";

export class Nav extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
               <Switch>
                  <PrivateRoute exact path="/" component={Home}/>
                  <LoginRoute exact path="/login" component={Login}/>
                  <PrivateRoute  path="/goods*" component={Goods}/>
                  <PrivateRoute exact path="/cart" component={Cart}/>
                   <Redirect from="/*" to="/"/>
               </Switch>
                    {/*<Route exact={true} path={"/"} component={Login}/>*/}
                    {/*<Route path={"/home"} component={Home}/>*/}
                    {/*<Route path={"/cart"} component={Cart}/>*/}
                    {/*<Route path={"/goods"} component={Goods}/>*/}
                    {/*<Route path={"/register"} component={Register}/>*/}
                    {/*<Route path={"/admin"} component={Admin}/>*/}


            </Router>
        );
    }
}