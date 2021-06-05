import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./service/userService"
// import {message} from "antd";

export default class AdminRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,

        };
    }

    checkAuth = (data) => {
        console.log(data);
        if (data.status >= 0) {
            this.setState({isAuthed: true, hasAuthed: true});
            const user=JSON.parse(localStorage.getItem("user"));
            if(user==null){
                localStorage.setItem("user",JSON.stringify(data.auth));
            }
        } else {
            // message.error(data.msg);
            //TODO 信息处理
            localStorage.removeItem('user');
            this.setState({isAuthed: false, hasAuthed: true});
        }
    };


    componentDidMount() {
        userService.checkSession(this.checkAuth);
        const user=JSON.parse(localStorage.getItem("user"));
        console.log(user);
        console.log(this.state);
    }


    render() {

        const {component: Component, path="/",exact=false,strict=false} = this.props;

        //console.log(this.state.isAuthed);

        if (!this.state.hasAuthed) {
            return null;
        }
        const user=JSON.parse(localStorage.getItem("user"));
        const usertype=user.userType;
        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuthed ? (
                // <Component {...props}/>
                usertype==1 ?(
                    <Component {...props}/>
                ):(
                    <Redirect to={{
                      pathname:'/',
                        state:{from:props.location}
                    }}/>
                )

            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

