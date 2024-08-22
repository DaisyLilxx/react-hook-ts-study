import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {Route} from 'dva/router'
import { Layout, Menu ,Button} from 'antd';
import React, { useState,useEffect } from 'react';
import BannerManage from '../pages/bannerManage/bannerManage'
import ActivityManage from '../pages/activityManage/activityManage'
import RegisterUserCheck from '../pages/registerUserCheck/registerUserCheck'
import AdminUserAdmin from '../pages/adminUserAdmin/adminUserAdmin'
import { useHistory } from 'dva/router';
import type { MenuProps } from 'antd';
import useLayout from './layout.hooks'
import './layout.css'
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory()
  console.log("history",history)
    const [selectedKey, setSelectedKey] = useState<string>(history.location.pathname);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
  const {currentMenus} = useLayout()
  console.log("currentMenus",currentMenus)
const linkPage: MenuProps['onClick'] = (e)=>{
	console.log('click ', e);
	setSelectedKey(e.key)
	history.push(e.key)
}

let currenPathArr = history.location.pathname.split('/')
console.log("currentMenus--ppp",currenPathArr)
useEffect(()=>{
	if(currenPathArr.length>2){
		setOpenKeys([`/${currenPathArr[1]}`])
	}else setOpenKeys([`${history.location.pathname}`])
},[])

const routerRender = (menuArr = currentMenus)=>
	 menuArr.map((item)=>{
		return <Route component={item.component} path={item.key+""}>
		 {item.children && routerRender(item.children)}
		</Route>
	})
const logout = ()=>{
	history.push('/login')
}
  return (
    <Layout id="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={currentMenus}
		  onClick={linkPage}
		  selectedKeys={[selectedKey]}
		  openKeys={openKeys}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
		  <Button type="link" onClick={logout}>退出</Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {routerRender()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;