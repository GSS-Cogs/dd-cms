import { defineMessages } from 'react-intl';

export const DashboardTileSchema = ({ intl }) => ({
    title: 'Dashboard Tile',

    fieldsets: [
        {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['topic', 'title'],
        },
        {
            id: 'footer',
            title: intl.formatMessage(messages.footerLinkFieldset),
            fields: ['href', 'linkTitle'],
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
        href: {
            type: 'string',
            title: intl.formatMessage(messages.href),
        },
        linkTitle: {
            type: 'string',
            title: intl.formatMessage(messages.linkTitle),
        },
    },

    required: ['topic', 'title'],
});

const messages = defineMessages({
    defaultFieldset: {
        id: 'Default',
        defaultMessage: 'Default',
    },
    footerLinkFieldset: {
        id: 'footerLinkFieldset',
        defaultMessage: 'Footer Link',
    },
    topic: {
        id: 'Topic',
        defaultMessage: 'Topic',
    },
    title: {
        id: 'Title',
        defaultMessage: 'Title',
    },
    href: {
        id: 'HREF',
        defaultMessage: 'Link Address',
    },
    linkTitle: {
        id: 'linkTitle',
        defaultMessage: 'Link Title',
    },
});