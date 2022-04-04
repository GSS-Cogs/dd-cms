import React from 'react';
import { Segment } from 'semantic-ui-react';
import { SidebarPortal, InlineForm } from '@plone/volto/components';
import { FigureMetaTextSchema } from './schema';

import _uniqueId from 'lodash/uniqueId';

export const FigureMetaTextEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  const schema = FigureMetaTextSchema(props);
  const schemaFields = schema.fieldsets[0].fields;

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

      <section>
        <h3 class="govuk-heading-m">{schema.title}</h3>
        {schemaFields.map((field) => {
          const uniqueId = _uniqueId(`${field}-`);

          return (
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor={uniqueId}>
                {schema.properties[field].title}
              </label>
              <input
                id={uniqueId}
                className="govuk-input govuk-!-width-full"
                name={uniqueId}
                type="text"
                value={data.text}
                onChange={(event) => {
                  onChangeBlock(block, {
                    ...data,
                    [field]: event.target.value,
                  });
                }}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};
