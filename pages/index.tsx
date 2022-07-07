import type { NextPage } from 'next'
import { Layout } from 'antd';
import CalendarContainer from './Calender/index';
import DragAndDropPage from './dragComponent';

const { Content, Footer } = Layout;

const Home: NextPage = () => {
  return (
    <Layout>
    <Content className="site-layout" style={{ padding: '24px 50px' }}>
      <div className="site-layout-background">
        <CalendarContainer />
        {/* <DragAndDropPage /> */}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Design ©2022 Created by CJohnSnow</Footer>
  </Layout>
  )
}

export default Home
