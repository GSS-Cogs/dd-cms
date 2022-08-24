import { defineMessages } from 'react-intl';

export const DashboardTileSchema = ({ intl }) => ({
    title: 'Manual Article',

    fieldsets: [
        {
            id: 'default',
            title: intl.formatMessage(messages.defaultFieldset),
            fields: ['title', 'summary', 'caption'],
        },
        {
            id: 'image',
            title: intl.formatMessage(messages.imageFieldset),
            fields: ['image_source'],
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
                }
            },
        },
    },

    required: ['summary', 'title', 'caption'],
});

const messages = defineMessages({
    defaultFieldset: {
        id: 'Default',
        defaultMessage: 'Default',
    },
    imageFieldset: {
        id: 'imageFieldset',
        defaultMessage: 'Image',
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
        defaultMessage: 'Image'
    },
});