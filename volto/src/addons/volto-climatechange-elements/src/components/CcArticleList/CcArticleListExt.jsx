import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CcRecentArticles } from '../CcArticleList/CcArticleList';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { FeedSignUps } from '../CcRelatedLinks/FeedSignUps';
import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';
import { CcArticlePreview } from './CcArticleList';
import { getRelatedItemsData } from '../../actions';
import { H4 } from 'govuk-react';
import { formattedDate } from '../../utils';

export const CcArticleListExt = ({ content }) => {
  const firstItem = content.items?.length > 0 ? content.items[0] : null;
  const formattedCreators = (creators) => creators?.join(', ');

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.relatedItemsData);

  console.log(content);

  useEffect(() => {
    // content.relatedItems.forEach((item) =>
    //   dispatch(getRelatedItemsData(item['@id'])),
    // );
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

      {content.items.map((data, i, idx) => {
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
    </div>
  );
};
