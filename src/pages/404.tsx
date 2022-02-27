import { Result, Button } from 'antd';
import { useHistory } from 'umi';

const NotFound = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您所访问的目标地址不存在"
      extra={
        <Button onClick={handleClick} type="primary">
          返回登陆
        </Button>
      }
    />
  );
};

export default NotFound;
