import { ExclamationCircleOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ReactElement } from 'react';

const ICON_SIZE = 18;
const { confirm } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure you want to logout?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => {
      console.log('OK');
    },
    onCancel: () => {
      console.log('Cancel');
    },
  });
};

const Logout = (): ReactElement => (
  <PoweroffOutlined
    style={{ fontSize: ICON_SIZE, cursor: 'pointer' }}
    onClick={showDeleteConfirm}
  />
);

export default Logout;
