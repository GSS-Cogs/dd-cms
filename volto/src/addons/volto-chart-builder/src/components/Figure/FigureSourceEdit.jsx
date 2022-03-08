import React from 'react';
import { Segment } from 'semantic-ui-react';
import { SidebarPortal, InlineForm } from '@plone/volto/components';
import { FigureSourceSchema } from './schema';
import { FigureSourceView } from './FigureSourceView';

export const FigureSourceEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = FigureSourceSchema(props);

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

      <FigureSourceView {...props} />
    </div>
  );
};
