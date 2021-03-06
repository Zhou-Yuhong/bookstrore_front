import React from 'react';
import './App.css';
import './css/style.css';
//import {HashRouter, Route,BrowserRouter as Router} from 'react-router-dom';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {Home} from "./component/home";
import {Login} from "./component/login2"
import {Cart} from "./component/cart"
import {Goods} from "./component/goods"
import {UserOrder} from "./component/order"
import {Register} from "./component/register"
import {Admin} from "./component/admin"
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import {history} from "./utils/history";
import AdminRoute from "./AdminRoute";
import {BookAdmin} from "./component/BookAdmin";
import {UserAdmin} from "./component/UserAdmin";
import {OrderAdmin} from "./component/OrderAdmin";
import {Analysis} from "./component/analysis";

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
                   <LoginRoute exact path="/register" component={Register}/>
                  <PrivateRoute  path="/goods*" component={Goods}/>
                  <PrivateRoute exact path="/cart" component={Cart}/>
                  <PrivateRoute exact path="/order" component={UserOrder}/>
                  <PrivateRoute exact path="/analysis" component={Analysis}/>
                  <AdminRoute  exact path="/admin" component={Admin}/>
                  <AdminRoute exact path="/bookadmin" component={BookAdmin}/>
                  <AdminRoute exact path="/useradmin" component={UserAdmin}/>
                  <AdminRoute exact path="/orderadmin" component={OrderAdmin}/>

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