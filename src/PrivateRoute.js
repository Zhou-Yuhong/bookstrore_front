import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import * as userService from "./service/userService"
// import {message} from "antd";

export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
    }

    checkAuth = (data) => {

        if (data.status >= 0) {
            this.setState({isAuthed: true, hasAuthed: true});
            const user=JSON.parse(localStorage.getItem("user"));
            if(user==null){
                localStorage.setItem("user",JSON.stringify(data.auth));
            }
            console.log(data);
        } else {
            // message.error(data.msg);
            //TODO 信息处理
            localStorage.removeItem('user');
            this.setState({isAuthed: false, hasAuthed: true});
        }
    };


    componentDidMount() {
        userService.checkSession(this.checkAuth);
    }


    render() {

        const {component: Component, path="/",exact=false,strict=false} = this.props;

        //console.log(this.state.isAuthed);

        if (!this.state.hasAuthed) {
            return null;
        }

        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.isAuthed ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}

