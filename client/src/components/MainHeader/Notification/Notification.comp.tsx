import { BellOutlined } from '@ant-design/icons';
import { Badge, Popover } from 'antd';
import { ReactElement, useState } from 'react';

const ICON_SIZE = 18;

const content = (
  <>
    <p>Notification #1</p>
    <p>Notification #2</p>
    <p>Notification #3</p>
    <p>Notification #4</p>
    <p>Notification #5</p>
  </>
);

const Notification = (): ReactElement => {
  const [viewed, setViewed] = useState(false);

  return (
    <Popover
      placement="bottomRight"
      title="Notification"
      content={content}
      trigger="click"
    >
      <Badge count={viewed ? 0 : 5} offset={[4, -4]}>
        <BellOutlined
          style={{ fontSize: ICON_SIZE, cursor: 'pointer' }}
          onClick={() => setViewed(true)}
        />
      </Badge>
    </Popover>
  );
};

export default Notification;
