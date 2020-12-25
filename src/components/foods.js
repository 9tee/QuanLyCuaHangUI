import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IMAGE_URL, STORE_URL } from '../consts';

const { Column } = Table;
const { Option } = Select;




class Foods extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], type: [], menu: [], visible: false, visibleMenu: false, buttonText: '' };
        this.formRef = React.createRef();

    }

    uploadProps = {
        name: 'file',
        action: `${IMAGE_URL}/upload`,
        onChange: (info) => {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
    };


    componentDidMount() {
        let config = { headers: { Auth: this.props.token } }
        axios.get(`${STORE_URL}/v1/menu/detail`, config)
            .then(
                (respone) => {
                    if (respone.data.code === 200) {
                        this.setState({ data: respone.data.data })
                    }
                    else {
                        this.props.history.push("/")
                    }
                }
            )
            .catch(console.log)
        axios.get(`${STORE_URL}/v1/menu`, config)
            .then(
                (respone) => {
                    if (respone.data.code === 200) {
                        this.setState({ menu: respone.data.data })
                    }
                    else {
                        this.props.history.push("/")
                    }
                }
            )
            .catch(console.log)
        axios.get(`${STORE_URL}/v1/category`, config)
            .then(
                (respone) => {
                    if (respone.data.code === 200) {
                        this.setState({ type: respone.data.data })
                    }
                    else {
                        this.props.history.push("/")
                    }
                }
            )
            .catch(console.log)
    }

    showModal(record) {
        this.setState({ visible: true },
            () => {
                this.formRef.current.setFieldsValue(record)
            })
    };

    showMenu() {
        this.setState({ visibleMenu: true })
    }

    onFinishFood = (values) => {
        if (!!values.picker) {
            values.image = values.picker.file.response;
        }
        delete values["picker"];
        let config = { headers: { Auth: this.props.token } }
        if (!values.id) {
            axios.put(`${STORE_URL}/v1/food`, values, config)
                .then(() => {
                    this.setState({ visible: false }, () => {
                        axios.get(`${STORE_URL}/v1/menu/detail`, config)
                            .then(
                                (respone) => { this.setState({ data: respone.data.data }, () => console.log(this.state.data)) }
                            )
                            .catch(console.log)
                    })
                })
                .catch(console.log)
        }
        else {
            axios.post(`${STORE_URL}/v1/food`, values, config)
                .then(() => {
                    this.setState({ visible: false }, () => {
                        axios.get(`${STORE_URL}/v1/menu/detail`, config)
                            .then(
                                (respone) => { this.setState({ data: respone.data.data }, () => console.log(this.state.data)) }
                            )
                            .catch(console.log)
                    })
                })
                .catch(console.log)
        }
    }

    onFinishMenu = (values) => {
        let data = {
            create_date: 0,
            id: 0,
            ...values,
            store_id: 0,
            update_date: 0
        }
        let config = { headers: { Auth: this.props.token } }
        axios.post(`${STORE_URL}/v1/menu`, data, config)
            .then(() => {
                axios.get(`${STORE_URL}/v1/menu/detail`, config)
                    .then(
                        (respone) => {
                            if (respone.data.code === 200) {
                                this.setState({ data: respone.data.data })
                            }
                            else {
                                window.localStorage.removeItem('token')
                                this.props.history.push("/")
                            }
                        }
                    )
                    .catch(console.log)
                axios.get(`${STORE_URL}/v1/menu`, config)
                    .then(
                        (respone) => {
                            if (respone.data.code === 200) {
                                this.setState({ menu: respone.data.data })
                            }
                            else {
                                window.localStorage.removeItem('token')
                                this.props.history.push("/")
                            }
                        }
                    )
                    .catch(console.log)
                this.setState({ visibleMenu: false });
            })
            .catch(console.log)
    }

    handleCancel = () => {
        this.setState({ visible: false }, () => this.formRef.current.resetFields());
        this.setState({ visibleMenu: false });
    };


    render() {
        return (
            <>
                <Button
                    style={{
                        float: 'right',
                        margin: '0px 20px 15px 0px'
                    }}
                    onClick={() => { this.showModal({}); this.setState({ buttonText: 'Thêm' }); }}>
                    Thêm mới đồ ăn
                </Button>

                <Button
                    style={{
                        float: 'right',
                        margin: '0px 20px 15px 0px'
                    }}
                    onClick={() => { this.showMenu() }}>
                    Thêm mới menu
                </Button>

                {this.state.data.map((item) => (
                    <>
                        <h2>{item.menu.name}</h2>
                        <Table dataSource={item.foods} pagination={false}>
                            <Column title="Mã" dataIndex="id" key="id" />
                            <Column title="Ảnh" dataIndex="image" key="anh" render={(anh) => (<Image width={150} height={150} src={IMAGE_URL + anh} />)} />
                            <Column title="Tên món ăn" dataIndex="name" key="tenmon" />
                            <Column title="Giá" dataIndex="sale_price" key="gia" />
                            <Column title="Trạng thái" dataIndex="status" key="trangthai" />
                            <Column
                                title="Action"
                                key="action"
                                render={(record) => (
                                    <Space size="middle">
                                        <a onClick={() => { this.showModal(record); this.setState({ buttonText: 'Sửa' }); }}>Edit</a>
                                    </Space>
                                )}
                            />
                        </Table>
                    </>
                ))}

                <Modal
                    title="Đồ ăn"
                    visible={this.state.visible}
                    footer={false}
                    onCancel={this.handleCancel}
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        ref={this.formRef}
                        onFinish={this.onFinishFood}
                        initialValues={{}}
                    >
                        <Form.Item
                            label="Mã món"
                            name="id"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item
                            label="Ảnh"
                            name="image"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item
                            label="Chọn ảnh"
                            name="picker"
                        >
                            <Upload {...this.uploadProps}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Tên món"
                            name="name"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="sale_price"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="content"
                        >
                            <Input></Input>
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                        >
                            <Select>
                                <Option value={0}>Hết hàng</Option>
                                <Option value={1}>Còn hàng</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Loại"
                            name="category_id"
                        >
                            <Select>
                                {
                                    this.state.type.map((index) => {
                                        return <Option value={index.id}>{index.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Menu"
                            name="menu_id"
                        >
                            <Select>
                                {
                                    this.state.menu.map((index) => {
                                        return <Option value={index.id}>{index.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                            <Button htmlType="submit">{this.state.buttonText}</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Menu"
                    visible={this.state.visibleMenu}
                    footer={false}
                    onCancel={this.handleCancel}
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        ref={this.formRef}
                        onFinish={this.onFinishMenu}
                        initialValues={{}}
                    >
                        <Form.Item
                            label="Tên menu"
                            name="name"
                        >
                            <Input ></Input>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                            <Button htmlType="submit">Thêm</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(withRouter(Foods));