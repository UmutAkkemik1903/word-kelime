import React from 'react';
import {Outlet} from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{backgroundColor:'#15172a'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: "#2c2e40"
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#2c2e40"
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            marginTop:50,
            background: colorBgContainer,
            minHeight: 728,
            padding: 24,
            borderRadius: borderRadiusLG,
            backgroundColor: "#2c2e40"
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor:'#15172a',
          color:'#fffafa'
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;