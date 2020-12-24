import React from 'react';
import { Tabs, Button } from 'antd';
import Foods from './foods';
import Shop from './shop';
import Order from  './order';
import { withRouter } from "react-router-dom";

const { TabPane } = Tabs;

class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut = () => {
        window.dispatch({ type: 'LOGOUT' });
        this.props.history.push("/")
    };

    render() {
        return (
                <div style={{ paddingBottom: 30 }}>
                    <Tabs tabBarExtraContent={<Button type="button" onClick={this.logOut}>Log Out</Button>}>
                        <TabPane tab="Quản lý đồ ăn" key="1">
                            <Foods></Foods>
                        </TabPane>
                        <TabPane tab="Cửa hàng của bạn" key="2">
                            <Shop></Shop>
                        </TabPane>
                        <TabPane tab="Danh sách đơn hàng" key="3">
                            <Order></Order>
                        </TabPane>
                    </Tabs>
                </div>
        );
    }
}

export default withRouter(Body)