import React from 'react';
import PropTypes from 'prop-types';
import { H1, H2, H3, H4 } from 'govuk-react';
import moment from 'moment';
import { CcAuthor } from '../CcAuthor/CcAuthor';

export const CcArticlePreview = ({ data, skipSummary, authors }) => {
  const publishedDate = data.EffectiveDate ?? data.CreationDate;

  return (
    <article className="cc-article-preview">
      <aside className="govuk-caption-m">
        {moment(publishedDate).format('dddd D MMMM YYYY')}
      </aside>
      <H3>
        <a href={data['@id']?.replace('/api', '')} className="cc-article-list">
          {data.title}
        </a>
      </H3>
      {authors ? <CcAuthor authors={authors} /> : null}
      {skipSummary ? null : (
        <div className="cc-article-list-description">{data.description}</div>
      )}
    </article>
  );
};

export const CcArticleList = ({ items, linkTitle, linkHref, isEditMode }) => {
  const folder = `/${items[0]['@id'].split('/').splice(1, 1).join('')}`;
  return (
    <>
      <div className="cc-article-list">
        <H2>Articles</H2>
        {items?.map((data, i, idx) => (
          <CcArticlePreview key={i} data={data} />
        ))}
      </div>

      <H4>
        <a href={folder} className="cc-article-list">
          View All Articles
        </a>
      </H4>
    </>
  );
};

CcArticleList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export const CcRecentArticles = ({ articles = [] }) => {
  return (
    <div className="cc-article-list">
      <H4>Recent Articles</H4>
      {articles.map((data, i, idx) => (
        <CcArticlePreview
          key={i}
          data={{
            title: data.title,
            link: data['@id'],
            publicationDate: data.publishedDate,
          }}
          skipSummary={true}
        />
      ))}
    </div>
  );
};
