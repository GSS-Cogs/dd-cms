import tableSVG from '@plone/volto/icons/table.svg';
import { DashboardTileView } from './GssCogsElements/DashboardTile/DashboardTileView';
import { DashboardTileEdit } from './GssCogsElements/DashboardTile/DashboardTileEdit';
import { CcHeroHeaderView } from './GssCogsElements/CcHeroHeader/CcHeroHeaderView';
import { CcHeroHeaderEdit } from './GssCogsElements/CcHeroHeader/CcHeroHeaderEdit';
import { CcV2Preview } from './GssCogsElements/CcV2Preview/CcV2Preview';

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

    config.views.layoutViews.cc_preview = CcV2Preview;


    return config;
};

export default applyConfig;