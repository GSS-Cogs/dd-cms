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
        {
            id: 'call_to_action',
            title: intl.formatMessage(messages.call_to_action),
            fields: ['call_to_action'],
        },
        {
            id: 'margin',
            title: intl.formatMessage(messages.marginFieldset),
            fields: ['margin'],
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
        call_to_action: {
            type: 'string',
            title: intl.formatMessage(messages.call_to_action),
        },
        margin: {
            type: 'boolean',
            title: intl.formatMessage(messages.margin),
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
    marginFieldset: {
        id: 'marginFieldset',
        defaultMessage: 'Margin',
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
    call_to_action: {
        id: 'call_to_action',
        defaultMessage: 'Call to Action',
    },
    margin: {
        id: 'margin',
        defaultMessage: 'Inset Margin'
    },
});