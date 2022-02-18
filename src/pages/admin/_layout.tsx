import React, { FC, useEffect, useState } from 'react';
import { Layout as _Layout, Menu } from 'antd';
import { useHistory, useLocation } from 'umi';

const { Sider, Content } = _Layout;
const Layout: FC<any> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const [selectKey, setSelectKey] = useState('');
  useEffect(() => {
    setSelectKey(location.pathname);
  }, [location]);
  const handleMenuSelect = ({ key }: any) => {
    history.push(key);
  };
  return (
    <_Layout>
      <Sider>
        <Menu onSelect={handleMenuSelect} selectedKeys={[selectKey]}>
          <Menu.Item key="/admin/mockLogin">模拟登陆</Menu.Item>
          <Menu.Item key="/admin/function">功能模块管理</Menu.Item>
          <Menu.Item key="/admin/organization">组织机构管理</Menu.Item>
          <Menu.Item key="/admin/role">角色权限管理</Menu.Item>
          <Menu.Item key="/admin/optionLogs">操作日志管理</Menu.Item>
        </Menu>
      </Sider>
      <_Layout>
        <Content>{children}</Content>
      </_Layout>
    </_Layout>
  );
};
const Entry: FC<any> = ({ children }) => {
  return (
    <React.StrictMode>
      <Layout>{children}</Layout>
    </React.StrictMode>
  );
};

export default Entry;
