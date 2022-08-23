import { defineMessages } from 'react-intl';

export const DashboardTileSchema = ({ intl }) => ({
    title: 'Manual Article',

    fieldsets: [
        {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['title', 'summary', 'caption'],
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
    },

    required: ['summary', 'title', 'caption'],
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
    caption: {
        id: 'Caption',
        defaultMessage: 'Caption',
    },
});