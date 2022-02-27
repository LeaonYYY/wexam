import React, { FC, useEffect, useState } from 'react';
import { Layout as _Layout, Menu, Avatar, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';
import { useDispatch } from 'react-redux';

import styles from './_layout.less';
import { logout } from '@/models/user';

const { Sider, Content, Header } = _Layout;
const Layout: FC<any> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectKey, setSelectKey] = useState('');
  useEffect(() => {
    setSelectKey(location.pathname);
  }, [location]);
  const handleMenuSelect = ({ key }: any) => {
    history.push(key);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={handleLogout}>退出登录</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <_Layout className={styles.scoped}>
      <div className={styles.header}>
        <div className={styles.leftBox}>
          <div>Wexam</div>
          <div>基于教考分离的考试系统</div>
        </div>
        <div className={styles.rightBox}>
          <Avatar size={60} src={'https://joeschmoe.io/api/v1/random'} />
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <DownOutlined />
            </a>
          </Dropdown>
          ,
        </div>
      </div>
      <_Layout>
        <Sider className={styles.sider}>
          <Menu
            className={styles.menu}
            onSelect={handleMenuSelect}
            selectedKeys={[selectKey]}
          >
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
          <Content className={styles.content}>{children}</Content>
        </_Layout>
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
