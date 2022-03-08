import imageSVG from '@plone/volto/icons/image.svg';
import { ChartBuilderEdit } from './components/ChartBuilderEdit';
import { ChartBuilderView } from './components/ChartBuilderView';
import { FigureTitleEdit } from './components/Figure/FigureTitleEdit';
import { FigureTitleView } from './components/Figure/FigureTitleView';
import { FigureMetaTextEdit } from './components/Figure/FigureMetaTextEdit';
import { FigureMetaTextView } from './components/Figure/FigureMetaTextView';
import { FigureSourceEdit } from './components/Figure/FigureSourceEdit';
import { FigureSourceView } from './components/Figure/FigureSourceView';

import { chartBuilderRawData } from './reducers';

const applyConfig = (config) => {
  config.blocks.blocksConfig.chartBuilder = {
    id: 'chartBuilder',
    title: 'Chart Builder',
    icon: imageSVG,
    group: 'common',
    view: ChartBuilderView,
    edit: ChartBuilderEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.figureTitle = {
    id: 'figureTitle',
    title: 'Figure Title',
    icon: imageSVG,
    group: 'common',
    view: FigureTitleView,
    edit: FigureTitleEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.figureMetaText = {
    id: 'figureMetaText',
    title: 'Figure Text',
    icon: imageSVG,
    group: 'common',
    view: FigureMetaTextView,
    edit: FigureMetaTextEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.blocks.blocksConfig.figureSource = {
    id: 'figureSource',
    title: 'Figure Source',
    icon: imageSVG,
    group: 'common',
    view: FigureSourceView,
    edit: FigureSourceEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.addonReducers.chartBuilderRawData = chartBuilderRawData;

  return config;
};

export default applyConfig;
