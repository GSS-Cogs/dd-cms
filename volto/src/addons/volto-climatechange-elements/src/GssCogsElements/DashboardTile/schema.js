import { defineMessages } from 'react-intl';

export const DashboardTileSchema = ({ intl }) => ({
    title: 'Dashboard Tile',

    fieldsets: [
        {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['topic', 'title'],
        },
    ],

    properties: {
        topic: {
            type: 'string',
            title: intl.formatMessage(messages.topic),
        },
        title: {
            type: 'string',
            title: intl.formatMessage(messages.title),
        },
    },

    required: ['topic', 'title'],
});

const messages = defineMessages({
    defaultFieldset: {
        id: 'Default',
        defaultMessage: 'Default',
    },
    topic: {
        id: 'Topic',
        defaultMessage: 'Topic',
    },
    title: {
        id: 'Title',
        defaultMessage: 'Title',
    },
});