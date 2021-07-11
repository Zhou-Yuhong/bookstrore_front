import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space,Popconfirm, Form } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {getBooks,deleteBooks,updateBooks,addBooks} from "../service/bookService";
import {Head} from "./header";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export class BookAdmin extends React.Component {
    constructor() {
        super();
        //表单选项栏
       this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                //width: '20%',
                editable:true,
                ...this.getColumnSearchProps('name'),
            },
           {
               title: 'Type',
               dataIndex: 'type',
               key:'type',
               //width:
               editable: true,
               ...this.getColumnSearchProps('type'),
           },
           {
               title: 'Description',
               dataIndex: 'description',
               key:'description',
               width: '30%',
               editable: true,
               ...this.getColumnSearchProps('description'),
           },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                //width: '20%',
                editable: true,
                ...this.getColumnSearchProps('author'),
            },
           {
               title: 'Price',
               dataIndex: 'price',
               key:'price',
               editable: true,
               ...this.getColumnSearchProps('price'),
           },
            {
                title: 'Image',
                dataIndex: 'image',
                key:'image',
                editable: true,
                render: (record) =><img src={record} alt="" width="100px" />

            },
            {
                title: 'Isbn',
                dataIndex: 'isbn',
                key:'isbn',
                width: '5%',
                editable: true,
                ...this.getColumnSearchProps('isbn')
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                key:'inventory',
                width:'20%',
                editable: true,
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
    }
    state = {
        searchText: '',
        searchedColumn: '',
        data: [],
        selectedRowKeys:[],
        maxkey:0
    };
    //删除书本并提交请求
    handleDelete = () => {
        console.log("delete");
        let dataSource = [...this.state.data];
        let deBooks=[];
        for(let i=0;i<this.state.selectedRowKeys.length;i++){
            //先根据key数组，找到对应书本加入到deleteBooks中
            const index=dataSource.findIndex((item)=>item.key==this.state.selectedRowKeys[i]);
            const book=dataSource[index];
            deBooks.push(book);
            //去除item
            dataSource.splice(index,1);
        }
        console.log(dataSource);

        this.setState(
            {data:dataSource}
        );
        console.log(this.state.data);
        const callback=(data)=>{
            //TODO 以后可能需要完善callback
            console.log(data);
        }
        let DeBooks={
            deletebooks:deBooks
        }
        //提交删除请求
        deleteBooks(DeBooks,callback);
        // this.setState({
        //     data: dataSource.filter((item) => item.key !== key),
        // });
    };
    //提交更新书本信息的请求
    handleUpdate=()=>{

        let dataSource=[...this.state.data];
        let upBooks=[];
        for(let i=0;i<this.state.selectedRowKeys.length;i++){
            const index=dataSource.findIndex((item)=>item.key==this.state.selectedRowKeys[i]);
            const book=dataSource[index];
            upBooks.push(book);
        }
        const callback=(data)=>{
            //TODO
            console.log(data);
        }
        let UpBooks={
            updatebooks:upBooks
        }
        updateBooks(UpBooks,callback);
    }
    //提交增加书本的请求，要先勾选要提交的
    handleAddBooks=()=>{
        let dataSource=[...this.state.data];
        let adBooks=[];
        for(let i=0;i<this.state.selectedRowKeys.length;i++){
            const index=dataSource.findIndex((item)=>item.key==this.state.selectedRowKeys[i]);
            const book=dataSource[index];
            adBooks.push(book);
        }
        const callback=(data)=>{
            //TODO
            console.log(data);
        }
        let AdBooks={
            addbooks:adBooks
        }
        addBooks(AdBooks,callback);
    }
    //增加一个书本供编辑
    handleAdd = ()=> {
       const maxkey=this.state.maxkey;
       const data=this.state.data;
       const newbook={
           key:maxkey,
           name:`书本${maxkey}`,
           type:`编程`,
           author:`周昱宏`,
           price:2.33,
           description:`do not go gentle into that night`,
           image:`https://github.com/Zhou-Yuhong`,
           isbn:`12138`,
           inventory:0
       };
       this.setState(
           {
               data:[...data,newbook],
               maxkey: maxkey+1,
           }
       );
    };
    //修改后自动保存本地
    handleSave=(row)=>{
        const newData=[...this.state.data];
        const index=newData.findIndex((item) => row.key === item.key);
        const item=newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState(
            {
              data:newData
            });
    };
    //获取所有书本并新加入key项（值为id）
    componentDidMount() {
        const callback = (data) => {
            //console.log(data);
            this.setState({data: data});
            const book_group=[];
            let maxkey=0;
            for(let i=0;i<this.state.data.length;i++){
                if(this.state.data[i].id>=maxkey) maxkey=this.state.data[i].id+1;
                book_group.push(
                    {
                        key:this.state.data[i].id,
                        name:this.state.data[i].name,
                        type:this.state.data[i].type,
                        author:this.state.data[i].author,
                        price:this.state.data[i].price,
                        description:this.state.data[i].description,
                        image:this.state.data[i].image,
                        isbn:this.state.data[i].isbn,
                        inventory:this.state.data[i].inventory
                    }
                );
            }
            this.setState({data:book_group,
                                 maxkey:maxkey
            });
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
        //设置有关选择的按钮是否有用
        const hasSelected = this.state.selectedRowKeys.length>0;
        //设置可编辑相关函数
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Head/>
                <Button type="primary"  disabled={!hasSelected} onClick={this.handleDelete}>
                    删除选中项
                </Button>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    新增一行
                </Button>

                <Button type="primary"  disabled={!hasSelected} onClick={this.handleAddBooks}>
                    提交新增书籍
                </Button>

                <Button type="primary"  disabled={!hasSelected} onClick={this.handleUpdate}>
                    更新选中项
                </Button>
                <span><a href="https://github.com/Zhou-Yuhong/imgs/upload/main" target="_blank" rel="noopener noreferrer">上传图片至图床</a></span>
            <Table  components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    rowSelection={rowSelection} columns={this.columns} dataSource={this.state.data}   columns={columns}
                    onClick={(record) => ({
                        onClick: () => {
                    this.selectRow(record);

                    console.log(this.state.selectedRowKeys)
                },
            })}/>
            </div>
            );
    }
}
