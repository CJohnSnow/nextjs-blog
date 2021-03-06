import type { NextPage } from 'next'
import { Layout } from 'antd';
import DragAndDropPage from './dragComponent';
import SwipeContainer from './swipe'

const { Content } = Layout;

const Home: NextPage = () => {
  return (
    <Layout>
    <Content className="site-layout" style={{ padding: '24px 50px' }}>
      <div className="site-layout-background">
        <SwipeContainer />
        {/* <DragAndDropPage /> */}
      </div>
    </Content>
  </Layout>
  )
}

export default Home
