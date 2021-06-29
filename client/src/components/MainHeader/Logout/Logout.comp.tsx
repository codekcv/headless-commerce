/* eslint-disable no-console */
import { PoweroffOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ReactElement } from 'react';

const ICON_SIZE = 18;

const Logout = (): ReactElement => (
  <Popconfirm
    placement="bottomRight"
    title="Are you sure you want to logout?"
    onConfirm={() => null}
    okText="Yes"
    cancelText="No"
  >
    <PoweroffOutlined style={{ fontSize: ICON_SIZE, cursor: 'pointer' }} />
  </Popconfirm>
);

export default Logout;
