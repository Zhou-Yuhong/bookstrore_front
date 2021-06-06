import React from 'react';
import './App.css';
import './css/style.css';
//import {HashRouter, Route,BrowserRouter as Router} from 'react-router-dom';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {Home,Home2} from "./component/home";
import {Login} from "./component/login"
import {Cart} from "./component/cart"
import {Goods} from "./component/goods"
import {Order} from "./component/order"
import {Register} from "./component/register"
import {Admin} from "./component/admin"
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import {history} from "./utils/history";
import AdminRoute from "./AdminRoute";
import {BookAdmin} from "./component/BookAdmin";
import {UserAdmin} from "./component/UserAdmin";

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
                  <PrivateRoute exact path="/order" component={Order}/>
                  <AdminRoute  exact path="/admin" component={Admin}/>
                  <AdminRoute exact path="/bookadmin" component={BookAdmin}/>
                  <AdminRoute exact path="/useradmin" component={UserAdmin}/>
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