import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { H1, H3, H4 } from 'govuk-react';

const CcArticlePreview = ({ data, skipSummary }) => {
  return (
    <article className="cc-article-preview">
      <aside className="cc-article-preview--date">{data.publicationDate}</aside>
      <H3>
        <a href={data.link} class="govuk-link">
          {data.title}
        </a>
      </H3>
      {skipSummary ? null : <div>{data.preview}</div>}
    </article>
  );
};

const TEST_ARTICLES = [
  {
    publicationDate: 'Monday, 1 November 2021',
    title: 'Emissions embedded in trade and impacts on climate change',
    preview:
      'Providing services — including financial, legal and communications services — tends ' +
      'to emit fewer greenhouse gas emissions than manufacturing goods such as petroleum products, iron, ' +
      'steel or concrete.',
    link: '#',
  },
  {
    publicationDate: 'Monday, 1 November 2021',
    title: 'Measuring greenhouse gas emissions',
    preview:
      'The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of' +
      ' different bases (territorial, residence and footprint) to fulfil a wide range of international ' +
      'agreements as well as for domestic policy making purposes. The three key official measures of UK ' +
      'GHG emissions, territorial, residence and footprint, are explored and defined below.',
    link: '#',
  },
  {
    publicationDate: 'Monday, 1 November 2021',
    title:
      'The UK’s climate is changing. What is driving this? How is the UK responding?',
    preview:
      'The latest report from the Intergovernmental Panel on Climate Change (IPCC), a United Nations' +
      ' body providing science-led comprehensive assessments of climate change science, found that climate' +
      ' change is already happening, with global surface temperatures between 2001 and 2020 around 1°C higher ' +
      'than during 1850 to 1900, and that this is having effects across the world and in the UK ' +
      'including making extreme weather events more likely.',
    link: '#',
  },
];

export const CcArticleList = ({ items, linkTitle, linkHref, isEditMode }) => {
  return (
    <div className="cc-article-list">
      <H1>Articles</H1>
      {TEST_ARTICLES.map((data, i, idx) => (
        <CcArticlePreview key={i} data={data} />
      ))}

      <a href="#">View all articles</a>
    </div>
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
