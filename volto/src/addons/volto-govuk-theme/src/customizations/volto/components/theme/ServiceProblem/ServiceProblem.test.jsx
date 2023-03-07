import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import ServiceProblem from './ServiceProblem';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

describe('ServiceProblem', () => {
  it('renders a not found component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ServiceProblem />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
