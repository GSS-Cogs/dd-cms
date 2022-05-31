import React from 'react';
import { Segment } from 'semantic-ui-react';
import { SidebarPortal, InlineForm } from '@plone/volto/components';
import { DashboardTileSchema } from './schema';
import { CcHeroHeaderView } from './CcHeroHeaderView';

export const CcHeroHeaderEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = DashboardTileSchema(props);

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

      <CcHeroHeaderView {...props} />
    </div>
  );
};
