import React from 'react';
import { DashboardTileView } from './DashboardTileView';
import { Segment, Form } from 'semantic-ui-react';
import { SidebarPortal, Field } from '@plone/volto/components';

export const DashboardTileEdit = (props) => {
    const { selected, onChangeBlock, block, data } = props;

    return (
        <div>
            <SidebarPortal selected={selected}>
                <Segment.Group raised>
                    <header className="header pulled">
                        <h2>Data table</h2>
                    </header>

                    <Form>
                        <Field
                            id="topic"
                            widget="string"
                            title="Topic"
                            value={data.topic || ''}
                            onChange={(id, value) =>
                                onChangeBlock(block, { ...data, [id]: value })
                            }
                        />
                        <Field
                            id="title"
                            widget="string"
                            title="title"
                            value={data.title || ''}
                            onChange={(id, value) =>
                                onChangeBlock(block, { ...data, [id]: value })
                            }
                        />
                    </Form>
                </Segment.Group>
            </SidebarPortal>

            <DashboardTileView {...props} />
        </div>
    );
};
