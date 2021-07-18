import { gql } from '@apollo/client';
import * as yup from 'yup';

export type FormValues = {
  username: string;
  password: string;
};

export const schema: yup.SchemaOf<FormValues> = yup.object().shape({
  username: yup.string().required('Username required: demo1user'),
  password: yup.string().required('Password required: demo1pass'),
});

export const HELLO_WORLD = gql`
  {
    helloWorld
  }
`;

export const ADMIN_LOGIN = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password)
  }
`;
