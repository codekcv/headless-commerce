import { gql } from '@apollo/client';

export const ICON_SIZE = 18;
export const MODAL_KEY = 'logout';

export const ADMIN_LOGOUT = gql`
  mutation {
    adminLogout
  }
`;
