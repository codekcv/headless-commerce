/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */

const expireDuration = 60 * 60 * 24 * 7; // 7 Days

export const setRefreshTokenCookie = (refreshToken: string): void => {
  const today = new Date();
  const expire = new Date();

  expire.setTime(today.getTime() + expireDuration);

  const cookie = `refreshToken=${refreshToken};expires=${expire.toUTCString()};HttpOnly;Secure`;

  document.cookie = cookie;
};

let timerStarted = false;

export const startAutoRefresh = (
  dispatch: any,
  adminActions: any,
  uri: any
): void => {
  if (!timerStarted) {
    timerStarted = true;

    setInterval(() => {
      const getAccessToken = async () => {
        const res = await fetch(`${uri}/refresh_token`, {
          method: 'POST',
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

let inMemoryAccessToken = '';

export const setMemoryToken = (value: string) => {
  inMemoryAccessToken = value;
};

export const getMemoryToken = (): string => inMemoryAccessToken;
