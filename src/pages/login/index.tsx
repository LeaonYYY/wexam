import React, { useState } from 'react';
import { ProFormText, LoginForm, ProFormCheckbox } from '@ant-design/pro-form';
import { message, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import { useDispatch } from 'react-redux';

import styles from './index.less';
import { login } from '@/services/login';
import { LoginMessage } from '@/types';
import { save } from '@/models/user';

const Login = () => {
  const [loginRole, setLoginRole] = useState<API.UserRoles>('student');
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = async (values: API.LoginProps) => {
    const res = await login({ ...values });
    if (res.status === 200) {
      dispatch(
        save({
          username: res.username,
          token: res.token,
        }),
      );
      let path = '';
      switch (res.role) {
        case 1:
          path = '/student';
          break;
        case 2:
          path = '/teacher';
          break;
        case 3:
          path = '/admin';
          break;
        default:
          break;
      }
      history.push(path);
      message.success('登陆成功');
    } else {
      message.error('登陆失败');
    }
  };
  return (
    <div className={styles.scpoed}>
      <div className={styles.loginBox}>
        <LoginForm
          title="Wexam"
          subTitle="基于教考分离的考试系统"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={handleSubmit}
        >
          <Tabs
            activeKey={loginRole}
            onChange={(activeKey) => {
              setLoginRole(activeKey as API.UserRoles);
            }}
          >
            <Tabs.TabPane key="student" tab={'学生登陆'} />
            <Tabs.TabPane key="teacher" tab={'教师登陆'} />
            <Tabs.TabPane key="admin" tab={'管理员登陆'} />
          </Tabs>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={
              loginRole === 'student'
                ? LoginMessage.student
                : loginRole === 'teacher'
                ? LoginMessage.teacher
                : LoginMessage.admin
            }
            rules={[
              {
                required: true,
                message: <LockOutlined className={styles.prefixIcon} />,
              },
            ]}
          />
          <ProFormText.Password
            name={'password'}
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
        <div className={styles.footer}>
          还没有账号？
          <a>快速注册</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
