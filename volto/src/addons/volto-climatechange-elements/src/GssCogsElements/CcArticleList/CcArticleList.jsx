import React from 'react';
import { H1, H3, H4 } from 'govuk-react';
import moment from 'moment';

import './CcArticleList.scss';
import { useArticleList } from '../../hooks';

const CcArticlePreview = ({ article, skipSummary }) => {
  return (
    <article className="cc-article-preview">
      <aside className="cc-article-preview--date">
        {moment(article.EffectiveDate).format('dddd, D MMMM YYYY')}
      </aside>
      <H3>
        <a href={article.getURL}>{article.title}</a>
      </H3>
      {skipSummary ? null : <div>{article.description}</div>}
    </article>
  );
};

export const CcArticleList = () => {
  const raw = useArticleList();

  const shownArticles = raw.loaded ? raw.items : [];

  return (
    <div className="cc-article-list">
      <H1>Articles</H1>
      {shownArticles.map((article) => (
        <CcArticlePreview key={article.id} article={article} />
      ))}

      <a href="/news">View all articles</a>
    </div>
  );
};

export const CcRecentArticles = () => {
  const raw = useArticleList();

  const shownArticles = raw.loaded ? raw.items : [];

  return (
    <div className="cc-article-list cc-article-header">
      <H4>Recent Articles</H4>
      {shownArticles.slice(0, 2).map((article) => (
        <CcArticlePreview
          key={article.id}
          article={article}
          skipSummary={true}
        />
      ))}
    </div>
  );
};
