import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    FileWordOutlined
} from '@ant-design/icons';
import '../css/adminLayout.css'
import { Layout, Menu, theme } from 'antd';
import {NavLink,Outlet} from "react-router-dom";
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider style={{backgroundColor:'#1e1e1e'}} trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    style={{backgroundColor:'#1e1e1e'}}
                    className="asd"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <NavLink to="/admin"><HomeOutlined /></NavLink>,
                            label: 'Anasayfa',
                        },
                        {
                            key: '2',
                            icon: <NavLink to="words"><FileWordOutlined /></NavLink>,
                            label: 'Kelimeler',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="admin-content"
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Sidebar;