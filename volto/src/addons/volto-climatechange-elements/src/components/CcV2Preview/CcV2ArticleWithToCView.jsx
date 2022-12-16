/**
 * article with toc view component.
 * @module components/theme/View/CcV2ArticleWithToCView
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { map } from 'lodash';
import config from '@plone/volto/registry';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';

import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';
import { formattedDate } from '../../utils';

export const CcV2ArticleWithToCView = (props) => {
  const { content, location } = props;

  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const mainContentRef = useRef(null);

  const formattedCreators = (creators) => creators.join(', ');

  const [contentHeaders, setContentHeaders] = useState(null);
  const [flatContentHeaders, setFlatContentHeaders] = useState([]);
  const [screenWidth, setScreenWidth] = useState(802);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      let width = window.innerWidth;
      setScreenWidth(width);
    };
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth]);

  useEffect(() => {
    getToCTitles();
  }, []);

  const getToCTitles = () => {
    // go through content[blocksLayoutFieldname].items and retrieve potential ToC titles
    let tempHeaders = [];
    let tempFlatHeaders = [];
    let currentIndex = -1;
    content[blocksLayoutFieldname].items.forEach((block) => {
      const contentBlock = content[blocksFieldname][block];
      if (blocksFieldname && contentBlock?.value !== undefined) {
        if (contentBlock?.value['0']?.type === 'h4') {
          const text = contentBlock?.plaintext;

          tempHeaders[currentIndex]['sub'].push({
            id: block,
            text: text.trim(),
          });
          if (tempHeaders[currentIndex]['sub'].length > 1) {
            tempFlatHeaders.push(text);
          }
        } else if (
          contentBlock?.value['0']?.type === 'h2' ||
          contentBlock?.value['0']?.type === 'h3'
        ) {
          const text = contentBlock?.plaintext;

          tempHeaders.push({ id: block, text: text.trim(), sub: [] });
          tempFlatHeaders.push(text);
          currentIndex += 1;
        }
      }
    });
    setContentHeaders(tempHeaders);
    setFlatContentHeaders(tempFlatHeaders);
  };

  const TableOfContent = useCallback(() => {
    function arrangeContentHeaders(items) {
      if (items === undefined) {
        return null;
      }

      if (items.length > 0) {
        return (
          <ul className="govuk-list">
            {items.map((item, index) => {
              return (
                <li className="ccv2-article-nav--link" key={index}>
                  <a className="govuk-link" onClick={() => scrollTo(item.id)}>
                    {item.text}
                  </a>
                  {arrangeContentHeaders(items[index]?.sub)}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return null;
      }
    }

    const contentList =
      contentHeaders !== null ? arrangeContentHeaders(contentHeaders) : null;

    return (
      <nav className="govuk-grid-column-one-third ccv2-article-nav">
        <h3 className="ccv2-article-nav--title">Contents</h3>
        {contentList}
      </nav>
    );
  });

  function scrollTo(hash) {
    //location.hash = '#' + hash;
    var element_to_scroll_to = document.getElementById(hash);
    //element_to_scroll_to.scrollIntoView();
    element_to_scroll_to.scrollIntoView({
      block: 'start',
      behavior: 'auto',
    });
  }

  const shouldDisplayBackToContentsButton = (currBlock) => {
    let displayBack = false;
    if (currBlock?.value !== undefined && flatContentHeaders !== null) {
      if (flatContentHeaders.includes(currBlock.plaintext)) {
        displayBack = true;
      }
    }
    return displayBack;
  };

  return (
    <div>
      <CcArticleHeader
        data={{
          title: content.title,
          summary: content.description,
          created: formattedDate(content.effective ?? content.created),
          creators: formattedCreators(content.creators),
          dashboard: content?.['@id'].includes('dashboard'),
        }}
      />
      <div
        className="volto-width-container--wide ccv2-article-body"
        id="navigation"
      >
        <div className="govuk-grid-row ccv2-article-body--main">
          <TableOfContent />
          <div
            className="govuk-grid-column-two-thirds ccv2-article-content-container"
            ref={mainContentRef}
          >
            {map(content[blocksLayoutFieldname].items, (block, index) => {
              const Block =
                config.blocks.blocksConfig[
                  content[blocksFieldname]?.[block]?.['@type']
                ]?.['view'] || null;

              const notTitleBlock =
                content[blocksFieldname]?.[block]?.['@type'] !== 'title';

              const contentBlock = content[blocksFieldname][block];
              const displayBack = shouldDisplayBackToContentsButton(
                contentBlock,
              );

              return Block !== null && notTitleBlock ? (
                <React.Fragment key={block + '#'}>
                  {displayBack && screenWidth <= 801 && (
                    <div
                      className="govuk-body-m govuk-link ccv2-article-nav--link"
                      onClick={() => scrollTo('navigation')}
                      style={{
                        paddingBottom: 20,
                      }}
                    >
                      Back to contents
                    </div>
                  )}

                  <Block
                    key={block}
                    id={block}
                    properties={content}
                    data={content[blocksFieldname][block]}
                    path={getBaseUrl(location?.pathname || '')}
                    styling=""
                  />
                </React.Fragment>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
