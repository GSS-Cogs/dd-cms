import imageSVG from '@plone/volto/icons/image.svg';
import App from 'chart-builder/src/App.tsx';

const applyConfig = (config) => {

  config.blocks.blocksConfig.chartBuilder = {
    id: 'chartBuilder',
    title: 'Chart Builder',
    icon: imageSVG,
    group: 'common',
    view: App,
    edit: App,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};

export default applyConfig;
