import styles from './index.less';
import { useHistory } from 'umi';
import { useEffect } from 'react';

export default function IndexPage() {
  const history = useHistory();
  useEffect(() => {
    history.push('/login');
  }, []);
  return <></>;
}
