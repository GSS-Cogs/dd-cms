import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { CcRelatedLinks } from '../CcRelatedLinks/CcRelatedLinks';
import { FeedSignUps } from '../CcRelatedLinks/FeedSignUps';
import { CcArticlePreview } from './CcArticleList';
import { getFolderishContent } from '../../actions';
import { H4, GridRow, GridCol } from 'govuk-react';
import { formattedDate } from '../../utils';

export const CcArticleListExt = (props) => {
  const { content } = props;
  const firstItem = content.items?.length > 0 ? content.items[0] : null;
  const formattedCreators = (creators) => creators?.join(', ');

  const dispatch = useDispatch();

  // const { data } = useSelector((state) => state.folderishContent);

  // console.log(data);

  useEffect(() => {
    // dispatch(getFolderishContent('/api/++api++/articles'));
  }, []);

  return (
    <div>
      <CcMasthead className="app-masthead--article cc-article-featured">
        <div className="cc-article-header volto-width-container--wide">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds govuk-!-padding-right-6">
              <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
                {firstItem.title}
              </h1>
              <p className="govuk-caption-m govuk-!-margin-bottom-6">
                {firstItem.created} by{' '}
                <span className="cc-article-header__date">
                  {firstItem.creators}
                </span>
              </p>
              <p className="govuk-body-l">{firstItem.description}</p>

              <H4>
                <a
                  href={firstItem['@id']?.replace('/api', '')}
                  className="cc-article-list"
                >
                  Read article
                </a>
              </H4>
            </div>
          </div>
        </div>
      </CcMasthead>
      <GridRow>
        <GridCol setWidth="two-thirds">
          {content.items.map((data, i, idx) => {
            console.log(idx);
            if (idx !== 0) {
              return (
                <div className="cc-article-preview">
                  <div className="volto-width-container--wide ccv2-article-body">
                    <div className="govuk-grid-row">
                      <div className="govuk-grid-column-two-thirds govuk-!-padding-right-6">
                        <CcArticlePreview key={i} data={data} />
                        <H4>
                          <a
                            href={firstItem['@id']?.replace('/api', '')}
                            className="cc-article-list"
                          >
                            Read article
                          </a>
                        </H4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </GridCol>
        <GridCol setWidth="one-thirds">
          <CcRelatedLinks />
        </GridCol>
      </GridRow>
    </div>
  );
};
