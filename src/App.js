import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import Body from './components/body';
import { Layout } from 'antd';

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <>
        <Layout style={{margin:'0px auto', width:'80%' , maxWidth:'1140px'}}>
          <Content style={{ background: "white" }}>
            <Body role={this.props.role}>

            </Body>
          </Content>
        </Layout>
      </>
    )
  };
}

const mapStateToProps = state => {
  console.log(state.login.role);
  return {
    role: state.login.role
  }
}

export default connect(mapStateToProps)(App);
