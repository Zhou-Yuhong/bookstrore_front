import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space,Button,Table } from 'antd';
import {getBA,getBP,getUA} from "../service/AnalysisService";
import {Head} from "./header"
const { RangePicker } = DatePicker;
export class Analysis extends React.Component{
    constructor() {
        super();
    }
    state={
        date:[],  //日期
        bookPurchase:[],//个人的书籍购买情况
        bookAnalysis:[],//各种书的销售情况
        userAnalysis:[]  //各个用户的统计
    }
    onChange=(value,dataString)=>{
        console.log(value);
        console.log(dataString);
        this.setState(
            {date:dataString}
        )
    }
    askBP=()=>{
        //获取个人在时间范围内的书籍购买情况
        const callback=(data)=>{

            const book_group=[];
             for(let i=0;i<data.length;i++){
                 book_group.push(
                     {
                         key:data[i].product_id,
                         name:data[i].name,
                         price:data[i].price,
                         num:data[i].num,
                         value:data[i].num*data[i].price
                     }
                 )
             }
           this.setState(
               {bookPurchase:book_group}
           )
    }
        const user=JSON.parse(localStorage.getItem("user"));
        const ask={
            userid:user.userId,
            date:this.state.date
        }
        getBP(ask,callback);
}

     askBA=()=>{
         const callback=(data)=>{
             console.log(data);
             const book_group=[];
             for(let i=0;i<data.length;i++){
                 book_group.push(
                     {
                         key:data[i].product_id,
                         name:data[i].name,
                         price:data[i].price,
                         num:data[i].num,
                         value:data[i].num*data[i].price
                     }
                 )
             }
             this.setState(
                 {bookAnalysis:book_group}
             )
             console.log(this.state.bookAnalysis);
         }
         const ask={
             date:this.state.date
         }
         getBA(ask,callback);
     }

     askUA=()=>{
        const callback=(data)=>{
            console.log(data);
            const user_group=[];

            for(let i=0;i<data.length;i++){
                user_group.push(
                    {
                        userid:data[i].userid,
                        username:data[i].username,
                        num:data[i].num,
                        value:data[i].value
                    }
                )
            }
            console.log(user_group);
            this.setState(
                {userAnalysis:user_group}
            )
            console.log(this.state.userAnalysis);
        }

        const ask={
            date:this.state.date
        }
        getUA(ask,callback);

     }

    //根据用户类型返回按钮
    renderButton=()=>{
        const user=JSON.parse(localStorage.getItem("user"));

        let unable=(this.state.date.length==0);
        if(user!=null&&user.userType==0){
            return <div>
                <Button type="primary" disabled={unable} onClick={this.askBP}>
                    查询日期范围内书籍购买情况
                </Button>
            </div>
        }
        else if(user!=null&&user.userType==1){
            return <div>
                <Button type="primary" disabled={unable} onClick={this.askBA}>
                    统计书籍销售情况
                </Button>
                <Button type="primary" disabled={unable} onClick={this.askUA}>
                    统计用户累计消费情况
                </Button>
            </div>
        }
    }
    //BP:bookpurchase
    renderBPTable=()=>{
        if(this.state.bookPurchase.length==0) return null;
        //清空其他两个数组
        const columns=[
            {
                title:'Name',
                dataIndex:'name',
                key:'name',
            },
            {
                title: 'Num',
                dataIndex: 'num',
                key:'num',
                sorter:(a,b) =>a.num-b.num,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key:'price'
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key:'value',
                sorter:(a,b)=>a.value-b.value
            }
        ]
        return (<Table columns={columns} dataSource={this.state.bookPurchase}/>);
    }
    //BA:Bookanalysis
    renderBATable=()=>{
        if(this.state.bookAnalysis.length==0) return null;
        //清空UA数组
        // const UA=[...this.state.userAnalysis];
        // UA.splice(0,UA.length);
        // this.setState(
        //     {userAnalysis:UA}
        // )
        const columns=[
            { title:'Name',
                dataIndex:'name',
                key:'name'
            },
            { title:'Price',
                dataIndex:'price',
                key:'price'
            },
            { title:'Num',
                dataIndex:'num',
                key:'num',
                sorter:(a,b)=>a.num-b.num
            },
            { title:'Value',
                dataIndex:'value',
                key:'value',
                sorter:(a,b)=>a.value-b.value
            },
        ]
        return(<Table columns={columns} dataSource={this.state.bookAnalysis}/>);
    }
    //UA:userAnalysis
    renderUATable=()=>{
        if(this.state.userAnalysis.length==0) return null;
        // const BA=[...this.state.bookAnalysis];
        // BA.splice(0,BA.length);
        // this.setState(
        //     {bookAnalysis:BA}
        // )
        const columns=[
            {
                title:'UserId',
                dataIndex:'userid',
                key:'userid'
            },
            {
             title:'Username',
             dataIndex:'username',
             key:'username'
            },
            {
              title: 'PurchaseNum',
              dataIndex: 'num',
              key:'num',
              sorter:(a,b)=>a.num-b.num
            },
            {
                title:'Value',
                dataIndex:'value',
                key:'value',
                sorter:(a,b)=>a.value-b.value
            }
        ]
        return(<Table columns={columns} dataSource={this.state.userAnalysis}/>)
    }
    render(){
        return(
            <div>
                <Head/>
                <space/>
            <RangePicker
                format="YYYY年MM月DD日"
                onChange={this.onChange}
                dateRender={current => {
                    const style = {};
                    if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                    }
                    return (
                        <div className="ant-picker-cell-inner" style={style}>
                            {current.date()}
                        </div>
                    );
                }}
            />
                {this.renderButton()}
                {this.renderUATable()}
                {this.renderBATable()}
                {this.renderBPTable()}

            </div>
        )
    }
}