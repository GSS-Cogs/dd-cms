import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Anontools from './Anontools';

const mockStore = configureStore();

describe('Anontools', () => {
  it('should render an anontools component when a token is specified to logout', async (done) => {
    const store = mockStore({
      userSession: { token: '1234' },
      content: { data: { '@id': 'myid' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = await renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Anontools />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    done();
  });
});
