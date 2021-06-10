import logo from './logo.svg';
import './App.css';
import './css/style.css';
import {HashRouter, Route,BrowserRouter as Router} from 'react-router-dom';
import {Side_full} from "./component/bottom.js";
import {Head}  from "./component/header.js";
import {Content,Slider,Sidebar,Product,footer} from "./component/mainpart.js";
import {Home,Home2} from "./component/home";
import {Login} from "./component/login"
import {Cart} from "./component/cart"
import {Goods} from "./component/goods"
import {Nav} from "./nav"
function App() {
  return (
    <div>
    <Nav/>
    </div>
  );
}

export default App;
