import React from 'react';
import { Segment } from 'semantic-ui-react';
import { SidebarPortal, InlineForm } from '@plone/volto/components';
import { FigureMetaTextSchema } from './schema';
import { FigureMetaTextView } from './FigureMetaTextView';

export const FigureMetaTextEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = FigureMetaTextSchema(props);

  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <InlineForm
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            formData={data}
          />
        </Segment.Group>
      </SidebarPortal>

      <FigureMetaTextView {...props} />
    </div>
  );
};
