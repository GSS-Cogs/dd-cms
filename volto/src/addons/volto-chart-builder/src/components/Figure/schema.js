import { defineMessages } from 'react-intl';

export const FigureTitleSchema = ({ intl }) => ({
  title: 'Figure Title',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['title'],
    },
  ],

  properties: {
    title: {
      type: 'string',
      title: intl.formatMessage(messages.title),
    },
  },

  required: ['title'],
});

export const FigureMetaTextSchema = ({ intl }) => ({
  title: 'Figure Text',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['text'],
    },
  ],

  properties: {
    text: {
      type: 'string',
      title: intl.formatMessage(messages.text),
    },
  },

  required: ['text'],
});

export const FigureSourceSchema = ({ intl }) => ({
  title: 'Figure Source',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['text', 'url'],
    },
  ],

  properties: {
    text: {
      type: 'string',
      title: intl.formatMessage(messages.text),
    },
    url: {
      type: 'string',
      title: intl.formatMessage(messages.url),
    },
  },

  required: ['text', 'url'],
});

const messages = defineMessages({
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  url: {
    id: 'url',
    defaultMessage: 'URL',
  },
});
