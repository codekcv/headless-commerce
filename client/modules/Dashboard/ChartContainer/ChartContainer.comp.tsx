import { Alert, Spin } from 'antd';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useAppSelector } from 'store';

import styles from './ChartContainer.module.css';

type Props = {
  children: ReactNode & ReactElement<any, string | JSXElementConstructor<any>>;
  height: number;
};

const ChartContainer = ({ children, height }: Props): JSX.Element => {
  const isSiderMoving = useAppSelector((state) => state.layout.isSiderMoving);

  if (isSiderMoving) {
    return (
      <Spin>
        <Alert message={null} type="info" style={{ height }} />
      </Spin>
    );
  }

  return (
    <div className={styles.container} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%" debounce={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
