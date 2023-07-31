import tableSVG from '@plone/volto/icons/table.svg';
import globeSVG from '@plone/volto/icons/globe.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import textSVG from '@plone/volto/icons/remove.svg';
import contentListingSVG from '@plone/volto/icons/content-listing.svg';
import { DashboardTileView } from './components/DashboardTile/DashboardTileView';
import { DashboardTileEdit } from './components/DashboardTile/DashboardTileEdit';
import { StandOutStatView } from './components/StandOutStat/StandOutStatView';
import { StandOutStatEdit } from './components/StandOutStat/StandOutStatEdit';
import { BlueLineViewTextBlock } from './components/Blocks/Text/View';
import { CcHeroHeaderView } from './components/CcHeroHeader/CcHeroHeaderView';
import { CcHeroHeaderEdit } from './components/CcHeroHeader/CcHeroHeaderEdit';
import { CcV2ArticleView } from './components/CcV2Preview/CcV2ArticleView';
import { CcV2ArticleWithToCView } from './components/CcV2Preview/CcV2ArticleWithToCView';
import { CcRelatedLinks } from './components/CcRelatedLinks/CcRelatedLinks';
import { CcArticleList } from './components/CcArticleList/CcArticleList';
import { CcArticleListExt } from './components/CcArticleList/CcArticleListExt';
import { CcCookieConsentView } from './components/CcCookieConsent/CcCookieConsentView';
import { CcCookieConsentEdit } from './components/CcCookieConsent/CcCookieConsentEdit';

import TextSettingsSchema from '@plone/volto/components/manage/Blocks/Text/Schema';

import {
  relatedItemsData,
  rawData,
  folderishContent,
  rawPhaseBanner,
  rawSiteTitle,
} from './reducers';

import '../theme/main.scss';
import customiseSlateConfig from './config/volto-slate/index';

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

  config.blocks.blocksConfig.standOutStat = {
    id: 'standOutStat',
    title: 'Stand Out Statistic',
    icon: contentListingSVG,
    group: 'common',
    view: StandOutStatView,
    edit: StandOutStatEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.blueLineText = {
    id: 'blueLineText',
    title: 'Blue Line Text',
    icon: textSVG,
    group: 'text',
    view: BlueLineViewTextBlock,
    edit: BlueLineViewTextBlock,
    schema: TextSettingsSchema,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
    // blockHasValue: (data) => {
    //   const isEmpty =
    //     !data.text ||
    //     (data.text?.blocks?.length === 1 && data.text.blocks[0].text === '');
    //   return !isEmpty;
    // },
  };
  config.blocks.blocksConfig.heroHeader = {
    id: 'heroHeader',
    title: 'Promo Banner',
    icon: heroSVG,
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

  config.blocks.blocksConfig.cookieConsent = {
    id: 'cookieConsent',
    title: 'Cookie Consent',
    icon: globeSVG,
    group: 'common',
    view: CcCookieConsentView,
    edit: CcCookieConsentEdit,
    restricted: false,
    mostUsed: false,
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
  config.settings.navDepth = 3; // This property controls the level of depth for the navigation items to request from server
  config.views.layoutViews.cc_article_list_ext = CcArticleListExt;

  // Revert this line
  config.views.layoutViews.cc_article_with_toc = CcV2ArticleWithToCView;
  config.views.layoutViews.cc_preview = CcV2ArticleView;

  config.views.contentTypesViews.sparql_dataconnector =
    config.views.contentTypesViews.discodataconnector;
  config.views.contentTypesViews.csv_type =
    config.views.contentTypesViews.discodataconnector;

  config.addonReducers.relatedItemsData = relatedItemsData;
  config.addonReducers.rawData = rawData;
  config.addonReducers.folderishContent = folderishContent;
  config.addonReducers.rawPhaseBanner = rawPhaseBanner;
  config.addonReducers.rawSiteTitle = rawSiteTitle;

  config = customiseSlateConfig(config);

  return config;
};

export default applyConfig;
