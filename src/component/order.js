import '../css/cart.css';
import React from 'react';
import {Head} from './header';
import {getAllOrders, getOrderItems, getOrders} from "../service/orderService";
import {Button, Input, Space, Table, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const text = <span>prompt text</span>;
function Order(key,id,num,order_time,state,userid,value){
    this.key=key;
    this.id=id;
    this.num=num;
    this.order_time=order_time;
    this.state=state;
    this.userid=userid;
    this.value=value;
}
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
export class UserOrder extends React.Component{
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
        ProductData:[],//根据具体的商品筛选的订单
        expandVisible: {},
        expandedData:{},
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
                    data: data
                }
            )
           let orders=[];
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
        }
        const user=JSON.parse(localStorage.getItem("user"));

        let value={
            userid:user.userId
        }
        console.log(value);
        getOrders(value,callback);
    }
    render_products=(products)=>{
        let products_all=[];
        for(var i=0;i<products.length;i++){
            products_all.push(
                <div className="info warp">

                    <ul>

                        <li className="info_2"><img src={products[i].image} width="80px"/></li>
                        <li className="info_3"><a href={"/goods?id="+products[i].product_id}>{products[i].name}</a></li>
                        <li className="info_4"><a>作者：{products[i].author}</a></li>
                        <li className="info_5">￥{products[i].price}</li>
                        <li className="info_6">
                            {"数量"+products[i].num}
                        </li>
                        <li className="info_7">￥{products[i].price*products[i].num}</li>
                    </ul>


                </div>
            )
        }
        return products_all
    }
    render_orders=(orders)=>{
        let orders_all=[];
        for(var i=0;i<orders.length;i++){
            orders_all.push(
                <div>
                    <div className="tips warp">

                        <ul>
                            <li>{"商品数"+orders[i].order_info.num}</li>
                            <li>{"下单时间"+orders[i].order_info.order_time}</li>
                            <li>{"总价"+orders[i].order_info.value}</li>
                            <li>{"商品状态"+orders[i].order_info.state}</li>
                        </ul>
                    </div>
                    {this.render_products(orders[i].order_products)}
                </div>
            )
        }
        return orders_all;
    }
    render(){

         return   <div >
             <Head/>
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
}

