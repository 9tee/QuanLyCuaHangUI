import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
 
import { STORE_URL, STAT_URL ,IMAGE_URL } from '../consts';
import { List, Avatar } from 'antd';


class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: {},
            comment: [],
            best_food: [],
            loyal_customer: [],
            info:{name:'',rate_avg:0}
        };
        this.formRef = React.createRef();

    }



    componentDidMount() {
        let config = {headers:{Auth: this.props.token}}
        axios.get(`${STORE_URL}/v1/store/comment`,config)
        .then((response) => {
            if (response.data.code === 200){
                this.setState({ comment: response.data.data })
            }
            else{
                window.localStorage.removeItem('token')
                this.props.history.push("/")
            } 
        })
        .catch(console.log)

        axios.get(`${STAT_URL}/v1/statisticstore/`,config)
        .then((response) => {
            if (response.data.error.code === 200){
                this.setState({best_food:response.data.data.best_selling_foods});
                this.setState({loyal_customer:response.data.data.loyal_customers_name});
                this.setState({info:{name:response.data.data.name, rate_avg:response.data.data.rate_avg}},() => console.log(this.state.info))
            }
            else{
                window.localStorage.removeItem('token')
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
                <h1>Thông tin cửa hàng</h1>
                <h3>
                    Tên cửa hàng:{this.state.info.name}
                </h3>
                <h3>
                    Đánh giá: {this.state.info.rate_avg}/5
                </h3>
                <h3>
                    Khách hàng thân thiết:
                </h3>

                <div className="kh" style={{ marginTop: 10 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.loyal_customer}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.customers_name}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <h3>
                    Món ăn bán chạy nhất:
                </h3>

                <div className="ma" style={{ marginTop: 10 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.best_food}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{item.food_name}</a>}
                                    description={item.total_count}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <h3>
                    Nhận xét:
                </h3>

                <div className="nhanxet" style={{ marginTop: 10 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.comment}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.user_id}</a>}
                                    description={item.comment}
                                />
                            </List.Item>
                        )}
                    />
                </div>

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
    return{
        token: state.login.token,
    }
}

export default connect(mapStateToProps)(withRouter(Shop));