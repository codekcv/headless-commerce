import { gql, useLazyQuery } from '@apollo/client';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { adminActions } from 'store/adminSlice';

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
  const checkingAccess = useAppSelector((state) => state.admin.checkingAccess);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [getNewAccessToken] = useLazyQuery(GET_NEW_ACCESS_TOKEN, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      dispatch(adminActions.setAccessToken(data.getNewAccessToken));
    },
    onError: () => {
      dispatch(adminActions.setAccessToken(''));
    },
  });

  useEffect(() => {
    if (accessToken !== null) {
      dispatch(adminActions.setIsAuthorized(!!accessToken));
    }
  }, [accessToken, dispatch]);

  // Maintain session if valid refresh token on mount.
  useEffect(() => {
    // Has to be from Redux state, else this runs at every page. Only want run once at first site mount.
    if (checkingAccess) {
      getNewAccessToken();
      dispatch(adminActions.setCheckingAccess(false));
    }
  }, [checkingAccess, dispatch, getNewAccessToken]);

  useEffect(() => {
    if (isAuthorized && router.pathname === '/') {
      router.push('/dashboard');
    }
  }, [isAuthorized, dispatch, router]);

  if (router.pathname !== '/' && isAuthorized === null) {
    return <p>Loading...</p>;
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
