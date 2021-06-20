import { Breadcrumb } from 'antd';

import styles from './MenuPath.module.css';

const { Item } = Breadcrumb;

type Props = {
  component: JSX.Element;
  path: string[];
};

const MenuPath = ({ component, path }: Props): JSX.Element => {
  return (
    <>
      <Breadcrumb className={styles.breadcrumb}>
        <Item>Main</Item>

        {path.map((breadcrumb) => (
          <Item key={breadcrumb}>{breadcrumb}</Item>
        ))}
      </Breadcrumb>

      <>{component}</>
    </>
  );
};

export default MenuPath;
