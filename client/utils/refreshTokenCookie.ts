import { AppDispatch } from 'store';
import { adminActions } from 'store/adminSlice';

const expireDuration = 60 * 60 * 24 * 7; // 7 Days

export const setRefreshTokenCookie = (refreshToken: string): void => {
  const today = new Date();
  const expire = new Date();

  expire.setTime(today.getTime() + expireDuration);

  document.cookie = `refreshToken=${refreshToken};expires=${expire.toUTCString()};HttpOnly;Secure`;
};

export const getRefreshTokenCookie = (): string | null => {
  const { cookie } = document;

  const params = cookie.split(';');
  const item = params.find((val) => val.includes('refreshToken'));

  if (item) {
    return item.split('=')[0];
  }

  return null;
};

let timerStarted = false;

export const startAutoRefresh = (dispatch: AppDispatch, uri: any): void => {
  if (!timerStarted) {
    timerStarted = true;

    setInterval(() => {
      const refreshToken = getRefreshTokenCookie();

      const getAccessToken = async () => {
        const res = await fetch(`${uri}/refresh_token`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (res) {
          const newAccessToken = await res.json();

          dispatch(adminActions.setAccessToken(newAccessToken));
          dispatch(adminActions.setIsAuthorized(true));
          dispatch(adminActions.setIsLoggedIn(true));
        } else {
          // Refresh Token is expired or invalidated.
          document.cookie =
            'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      };

      getAccessToken();
    }, 720000); // 12 minutes
  }
};
