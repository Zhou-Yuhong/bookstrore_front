import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space,message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {Head} from "./header";
import {disableUsers, enableUsers, getUsers} from "../service/userService";
import {getBooks} from "../service/bookService";

export class UserAdmin extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data: [],
        selectedRowKeys:[]
    };

    //获取所有User并加入key项（值为id）
    componentDidMount() {
        const callback = (data) => {
            //console.log(data);
            this.setState({data: data});
            const user_group=[];
            for(let i=0;i<this.state.data.length;i++){
                user_group.push(
                    {
                        key:this.state.data[i].userId,
                        username:this.state.data[i].username,
                        usertype:this.state.data[i].userType,
                        userstate:this.state.data[i].userstate
                    }
                );
            }
            this.setState({data:user_group});
        };
      //  getBooks({"search":null}, callback);
      getUsers({"search":null},callback);
      console.log(this.state.data);
    }

    handleDisableUser=()=>{
         let dataSource = [...this.state.data];
         //判断是不是管理员
         for(let i=0;i<this.state.selectedRowKeys.length;i++) {
             const index = dataSource.findIndex((item) => item.key == this.state.selectedRowKeys[i]);
             const user=dataSource[index];
             if(user.usertype==1){
                 message.info('无法对管理员进行操作');
                 return;
             }
         }
         //修改state
        for(let i=0;i<this.state.selectedRowKeys.length;i++) {
            const index = dataSource.findIndex((item) => item.key == this.state.selectedRowKeys[i]);
            dataSource[index].userstate=1;
        }
        this.setState(
            {data:dataSource}
        );
        let usergroup={
            keySet:this.state.selectedRowKeys
        }
        const callback=(data)=>{
            console.log(data);
        }
        disableUsers(usergroup,callback);
    }
    handleEnableUser=()=>{
        let dataSource = [...this.state.data];
        //判断是不是管理员
        for(let i=0;i<this.state.selectedRowKeys.length;i++) {
            const index = dataSource.findIndex((item) => item.key == this.state.selectedRowKeys[i]);
            const user=dataSource[index];
            if(user.usertype==1){
                message.info('无法对管理员进行操作');
                return;
            }
        }
        //修改state
        for(let i=0;i<this.state.selectedRowKeys.length;i++) {
            const index = dataSource.findIndex((item) => item.key == this.state.selectedRowKeys[i]);
            dataSource[index].userstate=0;
        }
        this.setState(
            {data:dataSource}
        );
        let usergroup={
            keySet:this.state.selectedRowKeys
        }
        const callback=(data)=>{
            console.log(data);
        }
        enableUsers(usergroup,callback);
    }

    //选择
    selectRow =(record) =>{
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({ selectedRowKeys });
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys:selectedRowKeys });
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



    render() {
        //表单选项栏
        const columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                //width: '30%',
                ...this.getColumnSearchProps('username'),
            },
            {
                title: 'Usertype',
                dataIndex: 'usertype',
                key: 'usertype',
                //width: '20%',
                //...this.getColumnSearchProps('usertype'),
            },
            {
                title: 'Userstate',
                dataIndex: 'userstate',
                key:'userstate',
                //width:'20%',
                //...this.getColumnSearchProps('userstate')
            }

        ];
        //选择用的东西
        const { selectedRowKeys } = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
            // onClick:(record) => {
            //     this.selectRow(record);
            //     console.log(this.state.selectedRowKeys)
            // }
        };
        const hasSelected = this.state.selectedRowKeys.length>0;
        return (
            <div>
                <Head/>
                <Button type="primary"  disabled={!hasSelected} onClick={this.handleDisableUser}>
                    禁用选中用户
                </Button>
                <Button type="primary"  disabled={!hasSelected} onClick={this.handleEnableUser}>
                    解禁选中用户
                </Button>
                <Table  rowSelection={rowSelection} columns={columns} dataSource={this.state.data}   onClick={(record) => ({
                    onClick: () => {
                        this.selectRow(record);

                        console.log(this.state.selectedRowKeys)
                    },
                })}/>
            </div>
        );
    }
}