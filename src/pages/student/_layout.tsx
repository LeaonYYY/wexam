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
          <Menu.Item key="/student/message">通知</Menu.Item>
          <Menu.Item key="/student/exam">考试</Menu.Item>
          <Menu.Item key="/student/score">成绩</Menu.Item>
          <Menu.Item key="/student/info">我的</Menu.Item>
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