import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { STORE_URL, STAT_URL, IMAGE_URL } from '../consts';
import { List, Avatar } from 'antd';


class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.formRef = React.createRef();

    }



    componentDidMount() {
        let config = { headers: { Auth: this.props.token } }
        axios.get(`${STAT_URL}/v1/listorder`, config)
            .then((response) => {
                if (response.data.error.code === 200) {
                    this.setState({ data: response.data.data })
                }
                else {
                    this.props.history.push("/")
                }
            })
            .catch(console.log)
    }

    receiveOrder(order_id) {
        let config = { headers: { Auth: this.props.token } }
        axios.post(`${STAT_URL}/v1/listorder/store/?orderid=${order_id}`, {}, config)
            .then((response) => {
                if (response.data.error.code === 200) {
                    if (response.data.data === true) {
                        alert("Nhận đơn hàng thành công");
                    }
                    else {
                        alert("Nhận đơn hàng thất bại");
                    }
                    axios.get(`${STAT_URL}/v1/listorder`, config)
                        .then((response) => {
                            if (response.data.error.code === 200) {
                                this.setState({ data: response.data.data }, () => console.log(this.state.data))
                            }
                            else {
                                this.props.history.push("/")
                            }
                        })
                        .catch(console.log)
                }
                else {
                    this.props.history.push("/")
                }
            })
            .catch(console.log)
    }

    showModal(record) {
        this.setState({ visible: true })
    };



    onFinishFood = (values) => {


    }


    handleCancel = () => {
        this.setState({ visible: false }, () => this.formRef.current.resetFields());
        this.setState({ visibleMenu: false });
    };


    render() {
        return (
            <>
                <List
                    itemLayout="vertical"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item key={item.title} >
                            <List.Item.Meta
                                title={<a>Mã đơn:{item.id}</a>}
                            />
                            <div> Danh sách hàng:
                                {
                                    (item.list_food || []).map((i) =>
                                        (<span>{i.name} x {i.quantity},</span>)
                                    )}
                            </div>
                            <div className="total-bill">
                                <span>Tiền ứng hàng : </span>
                                <span>{item.total_amount}đ</span>
                            </div>
                            <div className="tolocation">
                                <span>Điểm đến: </span>
                                <span>{item.address}</span>
                            </div>
                            {item.order_status === 2 ?
                                <div id="btn-nhan">
                                    <Button danger type="primary" onClick={() => this.receiveOrder(item.id)} style={{ border: 'none' }}>Nhận Đơn</Button>
                                </div>
                                :
                                <></>
                            }
                        </List.Item>
                    )}
                />


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
                        onFinish={this.onFinish}
                        initialValues={{}}
                    >
                        <Form.Item
                            label="Mã món"
                            name="id"
                        >
                            <Input disabled></Input>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                            <Button htmlType="submit">{this.state.buttonText}</Button>
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

export default connect(mapStateToProps)(withRouter(Order));