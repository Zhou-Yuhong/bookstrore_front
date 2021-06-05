import '../css/login.css';
import React from 'react';
const book_model={
    name:"",writer:"",money:"",series:""
}
const book_example={
    name:"三体",writer:"刘慈欣",money:"23.2" ,series:"科幻系列"
}
function Book(a,b,c,d){
    this.name=a;
    this.writer=b;
    this.money=c;
    this.series=d;
}
class Book_message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <h3>
               系列：{this.props.book.series}  书名:{this.props.book.name}   作者:{this.props.book.writer} 价格：￥{this.props.book.money}
           </h3>
        );
    }
}
export class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state={
             data_array:[],
             name_get:"",
             writer_get:"",
             money_get:"",
             series_get:""
        }
    }
   componentDidMount() {
       const user=JSON.parse(localStorage.getItem("user"));
       console.log(user);
   }

    get_bookname=(e)=>{
        this.setState(
            { name_get:e.target.value}
        )

    }
    get_bookwriter=(e)=>{

        this.setState(
            { writer_get:e.target.value}
        )

    }
    get_bookprice=(e)=>{
        this.setState(
            { money_get:e.target.value}
        )
    }
    get_bookseries=(e)=>{
        this.setState(
            { series_get:e.target.value}
        )
    }
    render_message=(messages)=>{
      let message_all=[];
      for(var i=0;i<messages.length;i++){
          message_all.push(
            <Book_message book={messages[i]}/>
          );
      }
      return message_all;
    }
    add_book=()=>{

        let tmp=this.state.data_array;

        var book=new Book(this.state.name_get,this.state.writer_get,this.state.money_get,this.state.series_get);


        tmp.push(book);
        this.setState(
            {data_array:tmp}
        )
        //console.log(this.state.data_array);
    }

    delete_book=()=>{
        let tmp=this.state.data_array;
        let filter_array=tmp.filter(it=>it.name!=this.state.name_get);
        this.setState(
            {data_array:filter_array}
        )
    }
    render(){
       return(
           <div className="loginbox" style={
               {
                   height:600,
                   width:500,
                   backgroundImage:"url"+require("../img/login_background.jpg")+")"
               }
           }>
               <h2>管理员页面</h2>
               <form className="form-box">
                   <div className="inputBox">
                       <input type="text"
                          onChange={this.get_bookname}
                              name required/>
                       <label>输入书名</label>
                   </div>
                   <div className="inputBox">
                       <input type="text"
                              onChange={this.get_bookwriter}
                              name required/>
                       <label>输入作者</label>
                   </div>
                   <div className="inputBox">
                       <input type="text"
                              onChange={this.get_bookprice}
                              name required/>
                       <label>输入价格</label>
                   </div>
                   <div className="inputBox">
                       <input type="text"
                              onChange={this.get_bookseries}
                              name required/>
                       <label>输入系列</label>
                   </div>
                   <ul className="subitems">
                   <li><input type="button"
                              onClick={this.add_book}
                              name value="增加书籍"/></li>

                   <li><input
                       onClick={this.delete_book}
                       type="button" name value="删除书籍"/></li>
                   </ul>
               </form>
               <div style={{
                   height:50}
               }>

               </div>
                <div>
                    {this.render_message(this.state.data_array)}

                </div>
           </div>
       );
    }
}