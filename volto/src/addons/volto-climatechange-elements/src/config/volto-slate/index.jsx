import React from 'react';
import { elements } from './SlateElements';
import TitleBlockView from 'volto-slate/blocks/Title/TitleBlockView';
import TitleBlockEdit from 'volto-slate/blocks/Title/TitleBlockEdit';

export default (config) => {

// https://github.com/eea/volto-slate/blob/master/src/editor/config.jsx
// Customise volto-slate config to include govuk-classes within HTML tags.
  config.settings.slate.elements = {
    ...config.settings.slate.elements,
    ...elements
  };

// https://github.com/eea/volto-slate/blob/master/src/blocks/Title/index.js
// The title of a document has its own special widget which is used for rendering.
// Component shadowing wasnt working for whatever reason, so we make changes here.
// The widget set a class of "firstDocumentHeading" as opposed to inheriting the 
// "govuk-heading-xl" class from <h1> tags.

  const className = 'govuk-heading-xl';
  const formFieldName = 'title';

  config.blocks.blocksConfig.title.view = (props) => (
    <TitleBlockView
      {...props}
      className={className}
      formFieldName={formFieldName}
    />
  );
  config.blocks.blocksConfig.title.edit = (props) => (
    <TitleBlockEdit
      {...props}
      className={className}
      formFieldName={formFieldName}
    />
  );

  return config;
};