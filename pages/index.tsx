import type { NextPage } from 'next'
import { Breadcrumb, Layout, Menu, Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
import styles from '../styles/Home.module.css'
// import User from './user'
import SwitchPicture from './carousel';

const Home: NextPage = () => {
  return (
    <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Segmented
          options={[
            {
              value: 'List',
              icon: <BarsOutlined />,
            },
            {
              value: 'Kanban',
              icon: <AppstoreOutlined />,
            },
          ]}
        />
      <div className="site-layout-background">
        <SwitchPicture />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}

export default Home
