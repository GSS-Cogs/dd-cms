import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, InlineForm, Field } from '@plone/volto/components';
import { FigureTitleSchema } from './schema';
import { FigureTitleView } from './FigureTitleView';

export const FigureTitleEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = FigureTitleSchema(props);

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

      <FigureTitleView {...props} />
    </div>
  );
};
