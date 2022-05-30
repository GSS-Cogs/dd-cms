import tableSVG from '@plone/volto/icons/table.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import { DashboardTileView } from './components/DashboardTile/DashboardTileView';
import { DashboardTileEdit } from './components/DashboardTile/DashboardTileEdit';
import { CcHeroHeaderView } from './components/CcHeroHeader/CcHeroHeaderView';
import { CcHeroHeaderEdit } from './components/CcHeroHeader/CcHeroHeaderEdit';
import { CcV2Overview } from './components/CcV2Preview/CcV2Overview';
import { CcV2ArticleView } from './components/CcV2Preview/CcV2ArticleView';
import { CcRelatedLinks } from './components/CcRelatedLinks/CcRelatedLinks';

import { relatedItemsData } from './reducers';

import "../theme/main.scss";

const applyConfig = (config) => {
  config.blocks.blocksConfig.dashboardTile = {
    id: 'dashboardTile',
    title: 'Dashboard Tile',
    icon: tableSVG,
    group: 'common',
    view: DashboardTileView,
    edit: DashboardTileEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.heroHeader = {
    id: 'heroHeader',
    title: 'Hero Header',
    icon: tableSVG,
    group: 'common',
    view: CcHeroHeaderView,
    edit: CcHeroHeaderEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.relatedLinks = {
    id: 'relatedLinks',
    title: 'Related Links',
    icon: globeSVG,
    group: 'common',
    view: CcRelatedLinks,
    edit: CcRelatedLinks,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.views.layoutViews.cc_preview = CcV2ArticleView;
  config.views.layoutViews.cc_preview2 = CcV2Overview;

  config.addonReducers.relatedItemsData = relatedItemsData;

  return config;
};

export default applyConfig;
