import { defineMessages } from 'react-intl';

export const DashboardTileSchema = ({ intl }) => ({
    title: 'Hero Header Tile',

    fieldsets: [
        {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['title', 'summary', ],
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
    },

    required: ['summary', 'title'],
});

const messages = defineMessages({
    defaultFieldset: {
        id: 'Default',
        defaultMessage: 'Default',
    },
    summary: {
        id: 'Summary',
        defaultMessage: 'Summary',
    },
    title: {
        id: 'Title',
        defaultMessage: 'Title',
    },
});