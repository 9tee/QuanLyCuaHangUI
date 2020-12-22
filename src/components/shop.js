import React from 'react';
import { Table, Space, Image, Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import { BASE_URL, IMAGE_URL } from '../consts';
import { List, Avatar } from 'antd';

const { Column } = Table;
const { Option } = Select;


const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];




class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], visible: false };
        this.formRef = React.createRef();

    }



    componentDidMount() {

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
                    Tên cửa hàng:
                </h3>
                <h3>
                    Đánh giá:
                </h3>
                <h3>
                    Khách hàng thân thiết:
                </h3>

                <div className="kh" style={{ marginTop: 10 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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

export default Shop;