import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';
import { DashboardTileSchema } from './schema';
import { CcHeroHeaderView } from './CcHeroHeaderView';

export const CcHeroHeaderEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = DashboardTileSchema(props);

  return (
    <div>
      <SidebarPortal selected={selected}>
        <Segment.Group raised>
          <Form>
            <Field
              id="file_path"
              widget="object_browser"
              mode="link"
              title="Featured Article"
              widgetOptions={{
                pattern_options: {
                  selectableTypes: [],
                },
              }}
              value={data.file_path || []}
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
      <CcHeroHeaderView {...props} />
    </div>
  );
};
