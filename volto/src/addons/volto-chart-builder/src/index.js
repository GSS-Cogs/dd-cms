import imageSVG from '@plone/volto/icons/image.svg';
import { ChartBuilderEdit } from './components/ChartBuilderEdit';
import { ChartBuilderView } from './components/ChartBuilderView';
import { FigureTitleEdit } from './components/FigureTitleEdit';
import { FigureTitleView } from './components/FigureTitleView';

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

  config.addonReducers.chartBuilderRawData = chartBuilderRawData;

  return config;
};

export default applyConfig;
