import loadable from '@loadable/component';

import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import FileView from '@plone/volto/components/theme/View/FileView';
import ImageView from '@plone/volto/components/theme/View/ImageView';
import ListingView from '@plone/volto/components/theme/View/ListingView';
import NewsItemView from '@plone/volto/components/theme/View/NewsItemView';
import SummaryView from '@plone/volto/components/theme/View/SummaryView';
import TabularView from '@plone/volto/components/theme/View/TabularView';
import LinkView from '@plone/volto/components/theme/View/LinkView';
import NotFoundView from '../components/theme/NotFound/NotFound';
import ConnectionRefused from '@plone/volto/components/theme/ConnectionRefused/ConnectionRefused';
import CorsError from '@plone/volto/components/theme/CorsError/CorsError';
import AlbumView from '@plone/volto/components/theme/View/AlbumView';
import ServiceProblem from '../components/theme/ServiceProblem/ServiceProblem';

const EventView = loadable(() =>
  import('@plone/volto/components/theme/View/EventView'),
);

// Layout View Registry
export const layoutViews = {
  document_view: DefaultView,
  summary_view: SummaryView,
  tabular_view: TabularView,
  listing_view: ListingView,
  link_redirect_view: LinkView,
  album_view: AlbumView,
};

// Content Types View Registry
export const contentTypesViews = {
  'News Item': NewsItemView,
  File: FileView,
  Image: ImageView,
  Event: EventView,
};

// Default view
export const defaultView = DefaultView;

export const errorViews = {
  '404': NotFoundView,
  '500': ServiceProblem,
  ECONNREFUSED: ConnectionRefused,
  corsError: CorsError,
};
