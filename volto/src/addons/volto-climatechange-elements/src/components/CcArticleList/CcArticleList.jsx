import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { H1, H2, H3, H4 } from 'govuk-react';
import moment from 'moment';

const CcArticlePreview = ({ data, skipSummary, isEditMode }) => {
  const publishedDate = data.EffectiveDate ?? data.CreationDate;

  return (
    <article className="cc-article-preview">
      <aside className="cc-article-preview--date">
        {moment(publishedDate).format('dddd D MMMM YYYY')}
      </aside>
      <H3>
        <a href={data['@id']?.replace('/api', '')} className="govuk-link">
          {data.title}
        </a>
      </H3>
      {skipSummary ? null : <div>{data.description}</div>}
    </article>
  );
};

export const CcArticleList = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  return (
    <>
      <div className="cc-article-list">
        <H2>Articles</H2>
        {items?.map((data, i, idx) => (
          <CcArticlePreview key={i} data={data} />
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
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
