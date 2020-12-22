import React from 'react';
import { Tabs, Button } from 'antd';
import Foods from './foods';
import Shop from './shop';
import { BrowserRouter as Router, Redirect, withRouter } from "react-router-dom";

const { TabPane } = Tabs;

class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut = () => {
        window.dispatch({ type: 'LOGOUT' });
        this.props.history.push("/login")
    };

    render() {
        return (
            <Router>
                <div style={{ paddingBottom: 30 }}>
                    <Tabs tabBarExtraContent={<Button type="button" onClick={this.logOut}>Log Out</Button>}>
                        <TabPane tab="Quản lý đồ ăn" key="1">
                            <Foods></Foods>
                        </TabPane>
                        <TabPane tab="Cửa hàng của bạn" key="2">
                            <Shop></Shop>
                        </TabPane>
                    </Tabs>
                </div>
            </Router>
        );
    }
}

export default withRouter(Body)