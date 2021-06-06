import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {Head} from "./header";

export class UserAdmin extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data: [],
        selectedRowKeys:[]
    };
    //删除书本

    //获取所有书本并加入key项（值为id）
    componentDidMount() {
        const callback = (data) => {
            //console.log(data);
            this.setState({data: data});
            const book_group=[];
            for(let i=0;i<this.state.data.length;i++){
                book_group.push(
                    {
                        key:this.state.data[i].id,
                        name:this.state.data[i].name,
                        author:this.state.data[i].author,
                        image:this.state.data[i].image,
                        isbn:this.state.data[i].isbn,
                        inventory:this.state.data[i].inventory
                    }
                );
            }
            this.setState({data:book_group});
        };

        getBooks({"search": null}, callback);
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                width: '20%',
                ...this.getColumnSearchProps('author'),
            },
            {
                title: 'Image',
                dataIndex: 'image',
                key:'image',
                render: (record) =><img src={record} alt="" width="100px" />

            },
            {
                title: 'Isbn',
                dataIndex: 'isbn',
                key:'isbn',
                width: '20%',
                ...this.getColumnSearchProps('isbn')
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                key:'inventory',
                width:'20%',
                ...this.getColumnSearchProps('inventory')
            }
            // {
            //     title: 'Address',
            //     dataIndex: 'address',
            //     key: 'address',
            //     ...this.getColumnSearchProps('address'),
            //     sorter: (a, b) => a.address.length - b.address.length,
            //     sortDirections: ['descend', 'ascend'],
            // },
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
                <Button type="primary"  disabled={!hasSelected} >
                    删除选中项
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