import { gql, useLazyQuery } from '@apollo/client';
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
  const isAuthorized = useAppSelector((state) => state.admin.isAuthorized);
  const checkingAccess = useAppSelector((state) => state.admin.checkingAccess);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [getNewAccessToken] = useLazyQuery(GET_NEW_ACCESS_TOKEN, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      dispatch(adminActions.setAccessToken(data.getNewAccessToken));
      dispatch(adminActions.setIsAuthorized(true));
    },
  });

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
      dispatch(adminActions.setCheckingAccess(false));
    }
  }, [dispatch, isAuthorized, router]);

  if (router.pathname !== '/' && !isAuthorized) {
    return null;
  }

  return children;
};

export default AccessProvider;
