import React, { useEffect, useState } from 'react';
import { LoginForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { history } from 'umi';

import { getClassList, userRegist } from '@/services/regist';
import styles from './index.less';

interface ClassItems {
  id: number;
  clazz: string;
}

const Regist = () => {
  const [classList, setClassList] = useState<ClassItems[]>([]);
  const [role, setRole] = useState('');
  useEffect(() => {
    fetchClassData();
  }, []);
  const fetchClassData = async () => {
    const res = await getClassList();
    if (res.code === 0) {
      setClassList(res.page.list);
    }
  };
  const handleSubmit = async (values: API.ResistBody) => {
    if (values.password !== values.password_r) {
      message.error('两次密码输入不一致');
      return;
    }
    const res = await userRegist(values);
    if (res.code === 0) {
      message.success('注册成功');
      history.push('/login');
    } else {
      message.error(res.msg);
    }
  };
  const handleRoleChange = (value: any) => {
    console.log(value);
  };
  return (
    <div className={styles.scpoed}>
      <div className={styles.registBox}>
        <LoginForm
          title={'注册'}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              style: {
                left: '200%',
              },
            },
          }}
        >
          <ProFormText
            name={'username'}
            fieldProps={{
              prefix: <UserOutlined />,
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                message: '用户名不能为空',
              },
            ]}
          />
          <ProFormText.Password
            name={'password'}
            fieldProps={{
              prefix: <UnlockOutlined />,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
              {
                pattern: /^[^ ]{0,16}$/,
                message: '密码不能含有空格',
              },
            ]}
          />
          <ProFormText.Password
            name={'password_r'}
            fieldProps={{
              prefix: <UnlockOutlined />,
            }}
            placeholder={'请再次输入密码'}
            rules={[
              {
                required: true,
                message: '必须再次输入密码',
              },
              {
                pattern: /^[^ ]{0,16}$/,
                message: '密码不能含有空格',
              },
            ]}
          />
          <ProFormSelect
            name={'level'}
            options={[
              {
                label: '学生',
                value: 1,
              },
              {
                label: '教师',
                value: 2,
              },
            ]}
            placeholder={'请选择您的角色'}
            rules={[
              {
                required: true,
                message: '必须进行角色选择',
              },
            ]}
          />
          <ProFormSelect
            name={'clazzid'}
            options={classList.map((item) => {
              return {
                label: item.clazz,
                value: item.id,
              };
            })}
            placeholder={'请选择加入的班级'}
          />
        </LoginForm>
        <div className={styles.footer}>
          已有账号？
          <a
            onClick={() => {
              history.push('/login');
            }}
          >
            马上登陆
          </a>
        </div>
      </div>
    </div>
  );
};
export default Regist;
