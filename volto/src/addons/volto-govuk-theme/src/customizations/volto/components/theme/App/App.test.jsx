import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import { __test__ as App } from './App';

beforeAll(() => {
  config.settings.navDepth = 1;
  config.views.errorViews = {
    ECONNREFUSED: () => <div className="ECONNREFUSED" />,
  };
});

const mockStore = configureStore();

jest.mock('@plone/volto/components', () => ({
  'Toolbar': () => null,
  'Header': () => null,
  'Breadcrumbs': () => null,
  'Messages': () => null,
  'Navigation': () => null,
  'Footer': () => null,
  'SkipLinks': () => null,
  'OutdatedBrowser': () => null,
  'Icon': () => null,
  'AppExtras': () => null,
}));

jest.mock('semantic-ui-react', () => ({
  Segment: jest.fn(() => <div id="segment" />),
  Container: jest.fn(() => <div id="container" />),
}));

describe('App', () => {
  it('renders a app component', () => {
    const store = mockStore({
      userSession: {
        token: 'abcdefgh',
      },
      content: { data: { id: 'content', '@type': 'Document' } },
      apierror: {},
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/blog/edit']}>
          <App
            location={{ pathname: '/blog/edit' }}
            route={{
              routes: '',
            }}
          >
            <div />
          </App>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
