import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';
import { AddItemView } from './AddItemView';

export const AddItemEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;

  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <header className="header pulled">
            <h2>Add item</h2>
          </header>
          <Form>
            <Field
              id="item"
              widget="object_browser"
              mode="link"
              title="Item"
              value={data.item || []}
              onChange={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
              widgetOptions={{
                pattern_options: {
                  selectableTypes: ['chart', 'figure', 'Image'],
                },
              }}
            />
          </Form>
        </Segment.Group>
      </SidebarPortal>

      <AddItemView {...props} />
    </div>
  );
};
