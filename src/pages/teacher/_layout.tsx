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
          <Menu.Item key="/teacher/notice">通知管理</Menu.Item>
          <Menu.Item key="/teacher/student">学生管理</Menu.Item>
          <Menu.Item key="/teacher/class">班级管理</Menu.Item>
          <Menu.Item key="/teacher/score">成绩管理</Menu.Item>
          <Menu.Item key="/teacher/examBase">题库管理</Menu.Item>
          <Menu.Item key="/teacher/examPage">试卷管理</Menu.Item>
          <Menu.Item key="/teacher/examWatch">线上监考</Menu.Item>
          <Menu.Item key="/teacher/check">线上批卷</Menu.Item>
          <Menu.Item key="/teacher/mine">我的</Menu.Item>
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
