import React, { useState } from 'react';
import { ProFormText, LoginForm, ProFormCheckbox } from '@ant-design/pro-form';
import { message, Tabs, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';

import styles from './index.less';
import { login } from '@/services/login';
import { LoginMessage } from '@/types';

const Login = () => {
  const [loginRole, setLoginRole] = useState<API.UserRoles>('student');
  const history = useHistory();
  const handleSubmit = async (values: API.LoginProps) => {
    const { status } = await login(values);
    if (status === 200) {
      history.push('/student');
    }
  };
  return (
    <div className={styles.scoped}>
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
  );
};
export default Login;
