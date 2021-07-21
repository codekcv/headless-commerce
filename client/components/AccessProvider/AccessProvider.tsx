import { gql, useLazyQuery } from '@apollo/client';
import { Button, Result, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { adminActions } from 'store/adminSlice';

import styles from './AccessProvider.module.css';

type Props = {
  children: JSX.Element;
};

const GET_NEW_ACCESS_TOKEN = gql`
  {
    getNewAccessToken
  }
`;

const AccessProvider = ({ children }: Props): JSX.Element | null => {
  const accessToken = useAppSelector((state) => state.admin.accessToken);
  const isAuthorized = useAppSelector((state) => state.admin.isAuthorized);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [getNewAccessToken] = useLazyQuery(GET_NEW_ACCESS_TOKEN, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      dispatch(adminActions.setAccessToken(data.getNewAccessToken));

      if (router.pathname === '/') {
        router.push('/dashboard');
      }
    },
    onError: () => {
      dispatch(adminActions.setAccessToken(''));
    },
  });

  useEffect(() => {
    if (isAuthorized === null) {
      getNewAccessToken();
    }
  }, [getNewAccessToken, isAuthorized]);

  useEffect(() => {
    if (accessToken === null) {
      dispatch(adminActions.setIsAuthorized(null));
    } else {
      dispatch(adminActions.setIsAuthorized(!!accessToken));
    }
  }, [accessToken, dispatch]);

  if ((router.pathname === '/' && isAuthorized) || isAuthorized === null) {
    return (
      <div className={styles.spinner}>
        <Spin />
      </div>
    );
  }

  if (router.pathname !== '/' && isAuthorized === false) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link href="/">
              <a>Go To Login Page</a>
            </Link>
          </Button>
        }
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return children;
};

export default AccessProvider;
