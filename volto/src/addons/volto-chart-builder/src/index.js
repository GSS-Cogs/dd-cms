import imageSVG from '@plone/volto/icons/image.svg';
import { ChartBuilderEdit } from './components/ChartBuilderEdit';
import { ChartBuilderView } from './components/ChartBuilderView';
import {
  FigureTitleEdit,
  FigureTitleView,
  FigureMetaTextEdit,
  FigureMetaTextView,
  FigureSourceEdit,
  FigureSourceView,
  FigureBlockEdit,
  FigureBlockView,
  FigureView,
} from './components/Figure';

import { chartBuilderRawData, figureBlockData } from './reducers';

const applyConfig = (config) => {
  const defaultOptions = {
    icon: imageSVG,
    group: 'common',
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

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
    ...defaultOptions,
    id: 'figureTitle',
    title: 'Figure Title',
    view: FigureTitleView,
    edit: FigureTitleEdit,
  };

  config.blocks.blocksConfig.figureMetaText = {
    ...defaultOptions,
    id: 'figureMetaText',
    title: 'Figure Text',
    view: FigureMetaTextView,
    edit: FigureMetaTextEdit,
  };

  config.blocks.blocksConfig.figureSource = {
    ...defaultOptions,
    id: 'figureSource',
    title: 'Figure Source',
    view: FigureSourceView,
    edit: FigureSourceEdit,
  };

  config.blocks.blocksConfig.figureBlock = {
    ...defaultOptions,
    id: 'figureBlock',
    title: 'Figure Block',
    view: FigureBlockView,
    edit: FigureBlockEdit,
  };

  config.addonReducers.chartBuilderRawData = chartBuilderRawData;
  config.addonReducers.figureBlockData = figureBlockData;

  config.views.layoutViews.figure_view = FigureView;

  return config;
};

export default applyConfig;
