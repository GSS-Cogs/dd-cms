import { defineMessages } from 'react-intl';

export const DashboardTileSchema = ({ intl }) => ({
  title: 'Static Content',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['title', 'summary', 'caption', 'image_source', 'margin'],
    },
    {
      id: 'phaseBannerFieldset',
      title: intl.formatMessage(messages.phaseBannerFieldset),
      fields: ['bannerDisplay', 'bannerStage', 'bannerLink', 'bannerLinkType'],
    },
  ],

  properties: {
    summary: {
      type: 'string',
      title: intl.formatMessage(messages.summary),
    },
    title: {
      type: 'string',
      title: intl.formatMessage(messages.title),
    },
    caption: {
      type: 'string',
      title: intl.formatMessage(messages.caption),
    },
    image_source: {
      widget: 'object_browser',
      title: intl.formatMessage(messages.image_source),
      widgetOptions: {
        pattern_options: {
          selectableTypes: ['Image'],
        },
      },
    },
    margin: {
      type: 'boolean',
      title: intl.formatMessage(messages.margin),
    },
    bannerDisplay: {
      type: 'boolean',
      title: intl.formatMessage(messages.bannerDisplay),
    },
    bannerStage: {
      title: intl.formatMessage(messages.bannerStage),
      choices: [
        ['alpha', 'Alpha'],
        ['beta', 'Beta'],
      ],
    },
    bannerLinkType: {
      title: intl.formatMessage(messages.bannerLinkType),
      choices: [
        ['link', 'Link'],
        ['mailto', 'Mail To'],
      ],
    },
    bannerLink: {
      type: 'string',
      title: intl.formatMessage(messages.bannerLink),
    },
  },

  required: [],
});

const messages = defineMessages({
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  phaseBannerFieldset: {
    id: 'phaseBannerFieldset',
    defaultMessage: 'Phase Banner',
  },
  summary: {
    id: 'Summary',
    defaultMessage: 'Summary',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  caption: {
    id: 'Caption',
    defaultMessage: 'Caption',
  },
  image_source: {
    id: 'image',
    defaultMessage: 'Image',
  },
  margin: {
    id: 'margin',
    defaultMessage: 'Inset Margin',
  },
  bannerDisplay: {
    id: 'bannerDisplay',
    defaultMessage: 'Display Phase Banner',
  },
  bannerStage: {
    id: 'bannerStage',
    defaultMessage: 'Stage',
  },
  bannerLinkType: {
    id: 'bannerLinkType',
    defaultMessage: 'Link Type',
  },
  bannerLink: {
    id: 'bannerLink',
    defaultMessage: 'Link Address',
  },
});

export const FeaturedContentSchema = ({ intl }) => ({
  title: 'Featured Content',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messagesFeaturedContent.defaultFieldset),
      fields: ['file_path', 'call_to_action'],
    },
  ],

  properties: {
    file_path: {
      widget: 'object_browser',
      title: intl.formatMessage(messagesFeaturedContent.file_path),
      mode: 'link',
      widgetOptions: {
        pattern_options: {
          selectableTypes: [],
        },
      },
    },
    call_to_action: {
      type: 'string',
      title: intl.formatMessage(messagesFeaturedContent.call_to_action),
    },
  },

  required: [],
});

const messagesFeaturedContent = defineMessages({
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  file_path: {
    id: 'file_path',
    defaultMessage: 'Article',
  },
  call_to_action: {
    id: 'call_to_action',
    defaultMessage: 'Call to Action',
  },
});
