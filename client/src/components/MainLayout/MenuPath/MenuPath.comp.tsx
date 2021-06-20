import { Breadcrumb } from 'antd';
import { ReactNode } from 'react';
import styles from './MenuPath.module.css';

const { Item } = Breadcrumb;

type Props = {
  children: ReactNode;
  path: string[];
};

const MenuPath = ({ children, path }: Props): JSX.Element => {
  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Item>Main</Item>

        {path.map((breadcrumb) => (
          <Item key={breadcrumb}>{breadcrumb}</Item>
        ))}
      </Breadcrumb>

      <>{children}</>
    </>
  );
};

export default MenuPath;
