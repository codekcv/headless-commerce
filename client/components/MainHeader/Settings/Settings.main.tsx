import { SettingOutlined } from '@ant-design/icons';
import { Modal, Space, Switch } from 'antd';
import { ReactElement, useState } from 'react';

const ICON_SIZE = 18;

const Setting = (): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  const closeModal = () => setIsVisible(false);

  return (
    <>
      <SettingOutlined
        style={{ fontSize: ICON_SIZE, cursor: 'pointer' }}
        onClick={() => setIsVisible(true)}
      />

      <Modal
        title="Admin Settings"
        visible={isVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Space direction="vertical">
          <Switch />
          <Switch />
          <Switch />
        </Space>
      </Modal>
    </>
  );
};

export default Setting;
