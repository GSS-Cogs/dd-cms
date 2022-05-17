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
            id: 'data',
            title: intl.formatMessage(messages.dataFieldset),
            fields: ['data_source'],
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
        data_source: {
            widget: 'object_browser',
            title: intl.formatMessage(messages.data_source),
            widgetOptions: {
                pattern_options: {
                    selectableTypes: ['discodataconnector', 'sparql_dataconnector', 'csv_type'],
                }
            },
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
    dataFieldset: {
        id: 'dataFieldset',
        defaultMessage: 'Data',
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
    data_source: {
        id: 'data',
        defaultMessage: 'Data'
    }
});