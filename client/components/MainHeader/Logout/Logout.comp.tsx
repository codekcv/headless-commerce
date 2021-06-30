/* eslint-disable no-console */
import { PoweroffOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { message, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useAppDispatch } from 'store';
import { adminActions } from 'store/adminSlice';

const ICON_SIZE = 18;
const MODAL_KEY = 'logout';

const ADMIN_LOGOUT = gql`
  mutation {
    adminLogout
  }
`;

const Logout = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogout] = useMutation(ADMIN_LOGOUT);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    message.loading({ content: 'Logging out...', key: MODAL_KEY });

    try {
      await adminLogout();

      message.success({
        content: 'Logged out succesfully!',
        key: MODAL_KEY,
        duration: 2,
      });

      dispatch(adminActions.setIsLoggedIn(false));
      dispatch(adminActions.firstLoginDone(false));
      router.push('/');
    } catch (error) {
      message.error({
        content: 'Logging out error!',
        key: MODAL_KEY,
        duration: 2,
      });
    }

    setIsLoading(false);
  };

  return (
    <Popconfirm
      placement="bottomRight"
      title="Are you sure you want to logout?"
      onConfirm={logout}
      okText="Yes"
      cancelText="No"
    >
      <PoweroffOutlined style={{ fontSize: ICON_SIZE, cursor: 'pointer' }} />
    </Popconfirm>
  );
};

export default Logout;
