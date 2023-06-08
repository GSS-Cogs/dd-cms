/**
 * Header component.
 * @module components/theme/Header/Header
 */

import CcCookieBanner from '../../../../../components/CcCookieBanner/CcCookieBanner';
import { useCookieConsent } from '../App/CookieConsentProvider';
import { Analytics } from './Analytics';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuperNavigationHeader } from '../../../../../components/CcSuperNavigationHeader/CcSuperNavigationHeader';
import { getSiteTitle } from '../../../../../actions';

const headerConfigDefault = {
  logo_link_title: 'Go to the GOV.UK homepage',
  logo_text: 'GOV.UK',
  logo_href: '/',
  service_name: '',
  navigation_links: [
    {
      label: 'Dashboards',
      href: '/dashboards',
      description: '',
      menu_contents: [],
      footer_links: [
        {
          label: 'About',
          href: '/about',
        },
        {
          label: 'Datasets',
          href: 'https://beta.gss-data.org.uk/datasets',
        },
      ],
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
  const cookieConsent = useCookieConsent();

  const listNavigation = useSelector((state) => state.navigation);
  const listDashboardItems = useSelector(
    (state) => state.reduxAsyncConnect.navigation?.items ?? [],
  );
  const siteTitle = useSelector(
    (state) => state.rawSiteTitle?.siteTitle?.data?.site_title ?? '',
  );

  const menu_contents = [];
  const dashBoardItems = listDashboardItems
    .filter((item) => item.title.toLowerCase() === 'dashboards')
    ?.map((item) => item.items)
    .flat(1);

  dashBoardItems.map((item) => {
    menu_contents.push({
      label: item.title,
      href: `${item['@id']}`,
      description: item.description,
    });
  });

  let dashboardDescription = '';
  listDashboardItems.map((item) => {
    if (item['@id']?.split('/').splice(-1).join('') === 'dashboards')
      dashboardDescription = item.description;
  });

  const navItems = listNavigation?.items ?? [];
  const checkIfArticlesNeeded = navItems.some(
    (item) => item.url === '/articles' && item.items?.length > 0,
  );

  headerConfig = headerConfigDefault;
  headerConfig.service_name = siteTitle;
  headerConfig.search_text =
    'Search ' + (siteTitle !== '' ? siteTitle : 'GOV.UK');
  headerConfig.navigation_links.map((navItem, index) => {
    if (dashBoardItems.length > 0) {
      if (navItem.label.toLowerCase() === 'dashboards') {
        navItem['menu_contents'] = menu_contents;
        navItem['description'] = dashboardDescription;
      }
    }
  });

  useEffect(() => {
    if (checkIfArticlesNeeded) {
      headerConfig.navigation_links.splice(1, 0, {
        label: 'Articles',
        href: '/articles',
      });
    }
  }, [checkIfArticlesNeeded]);

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  return (
    <>
      <CcCookieBanner />
      {cookieConsent && cookieConsent.usage && <Analytics />}
      <SuperNavigationHeader
        className={props?.pathname === '' ? 'root-header' : 'non-root-header'}
        navigation={headerConfig}
      />
    </>
  );
};

export default Header;
