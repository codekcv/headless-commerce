import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';

import styles from './MenuPath.module.css';

const { Item } = Breadcrumb;

type Props = {
  component: JSX.Element;
  path: string[];
};

const MenuPath = ({ component, path }: Props): JSX.Element => {
  const { pathname } = useRouter();

  if (pathname === '/') return component;

  return (
    <div>
      <Breadcrumb className={styles.breadcrumb}>
        <Item>Main</Item>

        {path.map((breadcrumb) => (
          <Item key={breadcrumb}>{breadcrumb}</Item>
        ))}
      </Breadcrumb>

      {component}
    </div>
  );
};

export default MenuPath;
