import Mock from 'mockjs';

const proxy = {
  'POST /api/login': Mock.mock((options) => {
    console.log(options);
    const res = {
      status: 304,
      role: 0,
      message: 'failed',
    };

    if (options.username === 'test' && options.password === '123') {
      res.message = 'success';
      res.role = 3;
      res.status = 200;
    } else {
      res.message = '账号不存在';
    }
    return res;
  }),
};

export default proxy;
