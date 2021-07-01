import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from 'store';

type MockType = MockedResponse<Record<string, any>>[] | undefined;

const AllProviders: FC<{ mocks: MockType }> = ({
  children,
  mocks,
}): JSX.Element => {
  return (
    <MockedProvider mocks={mocks} cache={new InMemoryCache()}>
      <Provider store={store}>{children}</Provider>
    </MockedProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'> & { mocks: MockType }
) => {
  return render(ui, {
    wrapper: (props) => {
      const mocks = options?.mocks ?? [];
      const allProps = { mocks, ...props };

      return <AllProviders {...allProps} />;
    },
    ...options,
  });
};

export default customRender;
