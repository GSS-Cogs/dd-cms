import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';
import { FigureBlockView } from './FigureBlockView';

export const FigureBlockEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;

  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <header className="header pulled">
            <h2>Add figure</h2>
          </header>
          <Form>
            <Field
              id="figure"
              widget="object_browser"
              mode="link"
              title="Figure"
              value={data.figure || []}
              onChange={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
            />
          </Form>
        </Segment.Group>
      </SidebarPortal>

      <FigureBlockView {...props} />
    </div>
  );
};
