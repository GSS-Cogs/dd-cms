import tableSVG from '@plone/volto/icons/table.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import { DashboardTileView } from './components/DashboardTile/DashboardTileView';
import { DashboardTileEdit } from './components/DashboardTile/DashboardTileEdit';
import { CcHeroHeaderView } from './components/CcHeroHeader/CcHeroHeaderView';
import { CcHeroHeaderEdit } from './components/CcHeroHeader/CcHeroHeaderEdit';
import { CcV2Overview } from './components/CcV2Preview/CcV2Overview';
import { CcV2ArticleView } from './components/CcV2Preview/CcV2ArticleView';
import { CcRelatedLinks } from './components/CcRelatedLinks/CcRelatedLinks';
import { CcArticleList } from './components/CcArticleList/CcArticleList';
import { CcArticleListExt } from './components/CcArticleList/CcArticleListExt';

import { relatedItemsData, rawData, folderishContent } from './reducers';

import '../theme/main.scss';

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

  config.blocks.blocksConfig.listing.variations.push(
    {
      id: 'articleList',
      isDefault: true,
      title: 'Article List',
      template: CcArticleList,
    },
    {
      id: 'relatedLinks',
      isDefault: true,
      title: 'Related Links',
      template: CcRelatedLinks,
    },
  );

  config.views.layoutViews.cc_article_list_ext = CcArticleListExt;
  // Revert this line
  config.views.layoutViews.cc_preview = CcArticleListExt;

  config.views.layoutViews.cc_preview2 = CcV2Overview;
  config.views.contentTypesViews.sparql_dataconnector =
    config.views.contentTypesViews.discodataconnector;
  config.views.contentTypesViews.csv_type =
    config.views.contentTypesViews.discodataconnector;

  config.addonReducers.relatedItemsData = relatedItemsData;
  config.addonReducers.rawData = rawData;
  config.addonReducers.folderishContent = folderishContent;

  return config;
};

export default applyConfig;
