import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Badge, Menu, Dropdown, Space, Input, Button,DatePicker,Tooltip} from 'antd';
import {Head} from "./header";
import {getAllOrders, getDateOrders, getOrderItems, getProductOrders} from "../service/orderService";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const { RangePicker } = DatePicker;
  function Order(key,id,num,order_time,state,userid,value){
      this.key=key;
      this.id=id;
      this.num=num;
      this.order_time=order_time;
      this.state=state;
      this.userid=userid;
      this.value=value;
  }
const text = <span>prompt text</span>;



class ChildTable extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Product_id',
                dataIndex: 'product_id',
                key: 'product_id'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Num',
                dataIndex: 'num',
                key: 'num'
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                render: (record) => <img src={record} alt="" width="100px"/>
            }, {
                title: 'Author',
                dataIndex: 'author',
                key: 'author'
            }
        ]
    }
    state={
        data:[]
    }
    componentDidMount() {
        const callback=(data)=>{
            this.setState({
                data:data
            })
     }
     const orderID={
        order_id:this.props.id
     }
     getOrderItems(orderID,callback);

    }
    render() {
        if(this.state.data.length==0) return null;
        else
        return <Table columns={this.columns} dataSource={this.state.data} pagination={false} />;
    }
}
const expandedRowRender=(record)=>{
    return <ChildTable id={record.id}/>
}
export class OrderAdmin extends React.Component{
     constructor() {
         super();
         this.columns=[
             {
                 title:'Id',
                 dataIndex:'id',
                 key:'id',
                 ...this.getColumnSearchProps('id')
             },
             {
                 title:'Userid',
                 dataIndex:'userid',
                 key:'userid',
                 ...this.getColumnSearchProps('userid')
             },
             {
                 title:'Order_time',
                 dataIndex:'order_time',
                 key:'order_time',
                 ...this.getColumnSearchProps('order_time')
             },
             {
                 title:'Num',
                 dataIndex:'num',
                 key:'num',
                 ...this.getColumnSearchProps('num')
             },
             {
                 title:'Value',
                 dataIndex:'value',
                 key:'value',
                 ...this.getColumnSearchProps('value')
             },
             {
                 title:'State',
                 dataIndex:'state',
                 key:'state',
                 ...this.getColumnSearchProps('state')
             }
         ]
     }
     state={
         searchText: '',
         searchedColumn: '',
         data:[],  //存放所有数据
         date:[],  //存放日期
         TimeData:[],//根据日期筛选出的订单
         ProductData:[],//根据具体的商品筛选的订单
         expandVisible: {},
         expandedData:{},
     }
    onChange=(value,dataString)=>{
        console.log(value);
        console.log(dataString);
        this.setState(
            {date:dataString}
        )
    }

    //筛选api
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

     renderAllOrders=()=>{
         if(this.state.data.length==0) return null;
         else return   <div >
             <Tooltip placement="top" title={text}>
                 所有订单表
             </Tooltip>
             <Table
             columns={this.columns}
             expandable={{expandedRowRender}}
             dataSource={this.state.data}
             />
         </div>
     }
    renderTimeOrders=()=>{
        if(this.state.TimeData.length==0) return null;
        else return<div>
            <Tooltip placement="top" title={text}>
               指定日期内订单
            </Tooltip>
            <Table
            columns={this.columns}
            expandable={{expandedRowRender}}
            dataSource={this.state.TimeData}
        /></div>
    }
     askAllOrders=()=>{
         const callback=(data)=> {
             this.setState(
                 {
                     data: data
                 }
             )
             let orders = [];
             for (let i = 0; i < this.state.data.length; i++) {
                 let order = new Order(
                     this.state.data[i].id,
                     this.state.data[i].id,
                     this.state.data[i].num,
                     this.state.data[i].order_time,
                     this.state.data[i].state,
                     this.state.data[i].userid,
                     this.state.data[i].value
                 );
                 orders.push(order);
             }
             this.setState(
                 {
                     data: orders
                 }
             )
             console.log(data);
         }
           getAllOrders({"search": null},callback);
     }
     askTimeOrders=()=>{
         const callback=(data)=> {
             let orders = [];
             for (let i = 0; i < data.length; i++) {
                 let order = new Order(
                     data[i].id,
                     data[i].id,
                     data[i].num,
                     data[i].order_time,
                     data[i].state,
                     data[i].userid,
                     data[i].value
                 );
                 orders.push(order);
             }
             this.setState(
                 {
                     TimeData: orders
                 }
             )
             console.log(data);
         }
         let ask={
             date:this.state.date
         }
         getDateOrders(ask,callback);
     }

     render() {
         // if(this.state.if_load==false) return null;
         return(
             <div>
                 <Head/>
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
                 <Button onClick={this.askTimeOrders}>
                     统计日期内订单
                 </Button>
                 <Button onClick={this.askAllOrders}>
                     统计所有订单
                 </Button>
                 {this.renderAllOrders()}
                 {this.renderTimeOrders()}
             </div>
         );
     }
}
