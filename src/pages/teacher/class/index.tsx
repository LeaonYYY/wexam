import { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Input } from 'antd';

import { columns } from './constant';
import { addClass, getClass } from '@/services/teacher';

const { TextArea } = Input;
interface dataType {
  key: string;
  name: string;
  idOfTeacher: string;
  headmaster: string;
  num: string;
}

const Notice = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [className, setClassName] = useState('');
  const [isModalShow, setIsModalShow] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await getClass();
    if (res.status === 0) {
    }
  };
  const handleClassAdd = async () => {
    const res = await addClass(className);
    console.log(res);
  };
  const handleClassNameChange = (e: any) => {
    setClassName(e.target.value);
  };
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setIsModalShow(true);
          }}
        >
          添加班级
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
        title={'创建班级'}
        onOk={handleClassAdd}
        onCancel={() => {
          message.info('取消创建');
          setIsModalShow(false);
        }}
        okText={'创建'}
        cancelText={'取消'}
        visible={isModalShow}
      >
        <Input
          placeholder="请输入班级名称"
          value={className}
          onChange={handleClassNameChange}
        />
      </Modal>
    </div>
  );
};
export default Notice;
