import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Table, Badge, Menu, Dropdown, Space, Input, Button} from 'antd';
import {Head} from "./header";
import {getAllOrders} from "../service/orderService";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
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
         data:[],  //存放总数据

         if_load:false
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

     componentDidMount() {
         const callback=(data)=>{
             this.setState(
                 {
                     data:data,
                     if_load:true
                 }
             )
             let orders=[];
             for(let i=0;i<this.state.data.length;i++){
                 let order=new Order(
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
                     data:orders
                 }
             )
             console.log(data);
         }
     //      getBooks({"search": null}, callback);
         getAllOrders({"search": null},callback);
     }

     render() {
         if(this.state.if_load==false) return null;
         return(
             <div>
                 <Head/>
             <Table
                 columns={this.columns}
                 expandable={{expandedRowRender}}
                 dataSource={this.state.data}
             />
             </div>
         );
     }
}