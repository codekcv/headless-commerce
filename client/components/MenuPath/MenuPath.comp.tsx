import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import formatPathCrumb from 'utils/formatPathCrumb';

import styles from './MenuPath.module.css';

const { Item } = Breadcrumb;

type Props = {
  component: JSX.Element;
};

const MenuPath = ({ component }: Props): JSX.Element => {
  const { pathname } = useRouter();

  if (pathname === '/') return component;

  return (
    <div>
      <Breadcrumb className={styles.breadcrumb}>
        <Item>Main</Item>

        {formatPathCrumb(pathname).map((breadcrumb) => (
          <Item key={breadcrumb}>{breadcrumb}</Item>
        ))}
      </Breadcrumb>

      {component}
    </div>
  );
};

export default MenuPath;
