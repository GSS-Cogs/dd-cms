/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuperNavigationHeader } from '../../../../../components/CcSuperNavigationHeader/CcSuperNavigationHeader';
import { getFolderishContent } from '../../../../../actions';

const headerConfigDefault = {
  logo_link_title: 'Go to the GOV.UK homepage',
  logo_text: 'GOV.UK',
  logo_href: '/',
  service_name: 'Climate Change',
  navigation_links: [
    {
      label: 'Dashboards',
      href: '/dashboards',
      description:
        'Dashboards about the different indicators of climate change',
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

  const listNavigation = useSelector((state) => state.navigation);
  const navItems = listNavigation?.items ?? [];
  const menu_contents = [];
  const items = navItems
    .filter((item) => item.url === '/dashboards')
    ?.map((item) => item.items)
    .flat(1);
  items.map((item) => {
    menu_contents.push({
      label: item.title,
      href: `${item.url}`,
    });
  });

  if (items.length > 0) {
    headerConfig = headerConfigDefault;
    headerConfig.navigation_links.map((navItem) => {
      if (navItem.label == 'Dashboards') {
        navItem['menu_contents'] = menu_contents;
      }
    });
  }

  console.log(headerConfig);

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
