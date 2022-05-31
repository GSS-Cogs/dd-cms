import React from 'react';
import { DashboardTileView } from './DashboardTileView';
import { Segment } from 'semantic-ui-react';
import { SidebarPortal, InlineForm } from '@plone/volto/components';
import { DashboardTileSchema } from './schema';
import { useTileVisValidation } from '../../hooks';

export const DashboardTileEdit = (props) => {
    const { selected, onChangeBlock, block, data, } = props;
    const { error: dataSourceErrors } = useTileVisValidation(data.data_source, data.vis_type);
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
                        errors={{
                          ...(props.errors || {}),
                          data_source: dataSourceErrors,
                        }}
                    />
                </Segment.Group>
            </SidebarPortal>

            <DashboardTileView {...props} />
        </div>
    );
};
