import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Badge, Menu, Dropdown, Space, Input, Button,DatePicker} from 'antd';
import {Head} from "./header";
import {getAllOrders,getDateOrders,getProductOrders} from "../service/orderService";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const { RangePicker } = DatePicker;
  function Order(key,id,num,order_time,state,userid,value,order_products){
      this.key=key;
      this.id=id;
      this.num=num;
      this.order_time=order_time;
      this.state=state;
      this.userid=userid;
      this.value=value;
      this.order_products=order_products;
  }
 const expandedRowRender=(record)=>{
    const columns=[
        {
            title:'Product_id',
            dataIndex:'product_id',
            key:'product_id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key:'name'
        },
        {
            title: 'Num',
            dataIndex: 'num',
            key:'num'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key:'price'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key:'image',
            render: (record) =><img src={record} alt="" width="100px" />
        }, {
            title: 'Author',
            dataIndex: 'author',
            key:'author'
        }
    ]
    return <Table columns={columns} dataSource={record.order_products} pagination={false} />;
}
// class NesredTable extends React.Component{
//     constructor() {
//         super();
//         this.state={
//             data:this.props.data
//         }
//         this.columns=[
//             {
//                 title:'Product_id',
//                 dataIndex:'product_id',
//                 key:'product_id'
//             },
//             {
//                 title: 'Name',
//                 dataIndex: 'name',
//                 key:'name'
//             },
//             {
//                 title: 'Num',
//                 dataIndex: 'num',
//                 key:'num'
//             },
//             {
//                 title: 'Price',
//                 dataIndex: 'price',
//                 key:'price'
//             },
//             {
//                 title: 'Image',
//                 dataIndex: 'image',
//                 key:'image',
//                 render: (record) =><img src={record} alt="" width="100px" />
//             }, {
//                 title: 'Author',
//                 dataIndex: 'author',
//                 key:'author'
//             }
//         ]
//     }
//     render(){
//         return <Table columns={this.columns} dataSource={this.state.data} pagination={false} />;
//     }
// }
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
         // if_load:false
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
         else return   <Table
             columns={this.columns}
             expandable={{expandedRowRender}}
             dataSource={this.state.data}
         />
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
                     this.state.data[i].order_info.id,
                     this.state.data[i].order_info.id,
                     this.state.data[i].order_info.num,
                     this.state.data[i].order_info.order_time,
                     this.state.data[i].order_info.state,
                     this.state.data[i].order_info.userid,
                     this.state.data[i].order_info.value,
                     this.state.data[i].order_products
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
                     data[i].order_info.id,
                     data[i].order_info.id,
                     data[i].order_info.num,
                     data[i].order_info.order_time,
                     data[i].order_info.state,
                     data[i].order_info.userid,
                     data[i].order_info.value,
                     data[i].order_products
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
    renderTimeOrders=()=>{
        if(this.state.TimeData.length==0) return null;
        else return   <Table
            columns={this.columns}
            expandable={{expandedRowRender}}
            dataSource={this.state.TimeData}
        />
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