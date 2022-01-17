import tableSVG from '@plone/volto/icons/table.svg';
import { DashboardTileView } from './GssCogsElements/DashboardTile/DashboardTileView';
import { DashboardTileEdit } from './GssCogsElements/DashboardTile/DashboardTileEdit';

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

    return config;
};

export default applyConfig;
