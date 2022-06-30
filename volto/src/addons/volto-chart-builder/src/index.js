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
  FigureView,
} from './components/Figure';

import { ChartView } from './components/Chart/ChartView';

import { AddItemEdit, AddItemView } from './components/AddItem';

import { chartBuilderRawData, addItemBlockData } from './reducers';

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
    title: 'Chart',
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

  config.blocks.blocksConfig.addItemBlock = {
    ...defaultOptions,
    id: 'addItemBlock',
    title: 'Add Item Block',
    view: AddItemView,
    edit: AddItemEdit,
  };

  config.addonReducers.chartBuilderRawData = chartBuilderRawData;
  config.addonReducers.addItemBlockData = addItemBlockData;

  config.views.layoutViews.chart_view = ChartView;
  config.views.layoutViews.figure_view = FigureView;

  return config;
};

export default applyConfig;
