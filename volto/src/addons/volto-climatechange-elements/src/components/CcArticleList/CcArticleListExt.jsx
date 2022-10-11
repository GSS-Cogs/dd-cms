import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { CcRelatedLinks } from '../CcRelatedLinks/CcRelatedLinks';
import { FeedSignUps } from '../CcRelatedLinks/FeedSignUps';
import { CcArticlePreview } from './CcArticleList';
import { getFolderishContent, getRelatedItemsData } from '../../actions';
import { H4, H5, GridRow, GridCol } from 'govuk-react';
import { formattedDate } from '../../utils';

export const CcArticleListExt = (props) => {
  const formattedCreators = (creators) => creators?.join(', ');
  const id = props?.content?.['@id'] ?? null;
  const path = id
    ? `${id.split('/').splice(-1).join('')}?metadata_fields=_all`
    : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFolderishContent(path));
    dispatch(getRelatedItemsData(path));
  }, [path]);

  const listRequest = useSelector((state) => state.folderishContent?.[path]);
  const relatedRequest = useSelector((state) => state.relatedItemsData);
  const items = listRequest?.data?.items ?? [];
  const firstItem = items?.length > 0 ? items[0] : null;

  const relatedLinks = relatedRequest?.data ?? [];
  let firstItemCreators = null;
  let firstItemDate = null;
  if (firstItem) {
    firstItemCreators = formattedCreators(firstItem.listCreators);
    firstItemDate = formattedDate(firstItem.EffectiveDate ?? firstItem.created);
  }
  return (
    <div>
      <CcMasthead className="app-masthead--article cc-article-featured">
        <div className="cc-article-header">
          <div className="govuk-!-padding-right-6">
            <H4>{firstItemDate}</H4>
            <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
              {firstItem?.title}
            </h1>
            <p className="govuk-caption-m govuk-!-margin-bottom-6">
              <span className="cc-article-header__date">
                Written by {firstItemCreators}
              </span>
            </p>
            <p className="govuk-body-l">{firstItem?.description}</p>

            <H4>
              <a
                href={firstItem?.['@id']?.replace('/api', '')}
                className="cc-article-list"
              >
                Read article
              </a>
            </H4>
          </div>
        </div>
      </CcMasthead>
      <GridRow>
        <GridCol setWidth="two-thirds" className="govuk-!-padding-right-8">
          {items.map((data, i, idx) => {
            if (i !== 0) {
              return (
                <div className="cc-article-preview" key={i}>
                  <div className="govuk-grid-row">
                    <CcArticlePreview
                      key={i}
                      data={data}
                      authors={formattedCreators(data.listCreators)}
                    />
                    <h3 className="govuk-heading-s">
                      <a href={data['@id']?.replace('/api', '')}>
                        Read article
                      </a>
                    </h3>
                    {i < items.length - 1 && (
                      <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl" />
                    )}
                  </div>
                </div>
              );
            }
          })}
        </GridCol>
        <GridCol setWidth="one-third">
          <CcRelatedLinks items={relatedLinks} doNotShowAll={true} />
        </GridCol>
      </GridRow>
    </div>
  );
};
