/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { SuperNavigationHeader } from '../../../../../components/CcSuperNavigationHeader/CcSuperNavigationHeader';
import { useGoogleAnalytics } from 'volto-google-analytics';

const headerConfigDefault = {
  logo_link_title: 'Go to the GOV.UK homepage',
  logo_text: 'GOV.UK',
  logo_href: '/',
  service_name: 'Climate Change',
  navigation_links: [
    {
      label: 'Dashboards',
      href: '/dashboards',
      description: '',
      menu_contents: [],
      footer_links: [
        {
          label: 'About the portal',
          href: '/about',
        },
        {
          label: 'Datasets',
          href: 'https://beta.gss-data.org.uk/datasets',
        },
      ],
    },
    {
      label: 'Articles',
      href: '/articles',
    },
    {
      label: 'About',
      href: '/about',
    },
  ],
  navigation_menu_heading: 'Navigation menu',
  navigation_search_heading: 'Search and popular pages',
  search_text: 'Search GOV.UK',
};

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
const Header = (props) => {
  let headerConfig = null;
  useGoogleAnalytics();
  const listNavigation = useSelector((state) => state.navigation);
  const listDashboardItems = useSelector(
    (state) => state.reduxAsyncConnect.navigation?.items ?? [],
  );
  const navItems = listNavigation?.items ?? [];
  const menu_contents = [];
  const dashBoardItems = navItems
    .filter((item) => item.url === '/dashboards')
    ?.map((item) => item.items)
    .flat(1);
  dashBoardItems.map((item) => {
    menu_contents.push({
      label: item.title,
      href: `${item.url}`,
    });
  });

  let dashboardDescription = '';
  listDashboardItems.map((item) => {
    if (item['@id']?.split('/').splice(-1).join('') === 'dashboards')
      dashboardDescription = item.description;
  });

  const checkIfArticlesNotNeeded = !navItems.some(
    (item) => item.url === '/articles' && item.items?.length > 0,
  );

  let indexOfArticle = -1;

  headerConfig = headerConfigDefault;
  headerConfig.navigation_links.map((navItem, index) => {
    if (dashBoardItems.length > 0) {
      if (navItem.label == 'Dashboards') {
        navItem['menu_contents'] = menu_contents;
        navItem['description'] = dashboardDescription;
      }
    }

    if (navItem.label == 'Articles') {
      indexOfArticle = index;
    }
  });

  if (checkIfArticlesNotNeeded && indexOfArticle > -1) {
    headerConfig.navigation_links.splice(indexOfArticle, 1);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  return (
    <>
      <SuperNavigationHeader
        className={props?.pathname === '' ? 'root-header' : 'non-root-header'}
        navigation={headerConfig}
      />
    </>
  );
};

export default Header;
