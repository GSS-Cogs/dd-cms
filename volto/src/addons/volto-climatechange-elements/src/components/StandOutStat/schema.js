import { defineMessages } from 'react-intl';

export const StandOutStatSchema = ({ intl }) => ({
  title: 'Stand Out Statistic',

  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.defaultFieldset),
      fields: ['figure', 'unit', 'text', 'linkText', 'href', 'bottomStat'],
    },
  ],

  properties: {
    figure: {
      type: 'string',
      title: intl.formatMessage(messages.figure),
    },
    unit: {
      type: 'string',
      title: intl.formatMessage(messages.unit),
    },
    text: {
      type: 'string',
      title: intl.formatMessage(messages.text),
    },

    href: {
      type: 'string',
      title: intl.formatMessage(messages.href),
    },
    linkText: {
      type: 'string',
      title: intl.formatMessage(messages.linkText),
    },
    bottomStat: {
      type: 'boolean',
      title: intl.formatMessage(messages.bottomStat),
    },
  },

  required: ['figure', 'unit', 'text', 'linkText', 'href', 'bottomStat'],
});

const messages = defineMessages({
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  figure: {
    id: 'Figure',
    defaultMessage: 'Figure',
  },
  unit: {
    id: 'Unit',
    defaultMessage: 'Unit',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  href: {
    id: 'HREF',
    defaultMessage: 'Link Address',
  },
  linkText: {
    id: 'linkText',
    defaultMessage: 'Link Text',
  },
  bottomStat: {
    id: 'bottomStat',
    defaultMessage: 'Bottom Statistic',
  },
});
