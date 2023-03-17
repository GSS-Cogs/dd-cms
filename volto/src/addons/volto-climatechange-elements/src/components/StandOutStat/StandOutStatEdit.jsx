import React from 'react';
import { StandOutStatView } from './StandOutStatView';
import { Segment } from 'semantic-ui-react';
import { SidebarPortal, InlineForm } from '@plone/volto/components';
import { StandOutStatSchema } from './schema';
import { useTileVisValidation } from '../../hooks';

export const StandOutStatEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const { error: dataSourceErrors } = useTileVisValidation(
    data.data_source,
    data.vis_type,
  );
  const schema = StandOutStatSchema(props);

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
            errors={{
              ...(props.errors || {}),
              ...(dataSourceErrors.length
                ? { data_source: dataSourceErrors }
                : {}),
            }}
          />
        </Segment.Group>
      </SidebarPortal>

      <StandOutStatView {...props} />
    </div>
  );
};
