/**
 * article with toc view component.
 * @module components/theme/View/CcV2ArticleWithToCView
 */

import React, { useEffect, useState, useRef } from 'react';
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
        } else if (
          contentBlock?.value['0']?.type === 'h2' ||
          contentBlock?.value['0']?.type === 'h3'
        ) {
          const text = contentBlock?.plaintext;

          tempHeaders.push({ id: block, text: text.trim(), sub: [] });
          currentIndex += 1;
        }
      }
    });
    console.log(tempHeaders);
    setContentHeaders(tempHeaders);
  };

  const getMainContentHeight = () => {
    // possible to use useMemo here?
    let tempHeight = 1000;
    if (screenWidth <= 801) {
      tempHeight = '100%';
    } else if (mainContentRef.current !== null) {
      tempHeight = mainContentRef.current.clientHeight;
    }
    return tempHeight;
  };

  let previousBlock = [];

  const TableOfContent = () => {
    function arrangeContentHeaders(items) {
      if (items === undefined) {
        return null;
      }

      if (items.length > 0) {
        return (
          <ul className="govuk-list">
            {items.map((item, index) => {
              return (
                <li>
                  <a className="govuk-link" href={'#' + item.id}>
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
      <nav className="ccv2-article-nav">
        <h3 className="ccv2-article-nav--title">Contents</h3>
        {contentList}
      </nav>
    );
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
        <div
          className="govuk-grid-row ccv2-article-body--main"
          style={{
            height: getMainContentHeight(),
          }}
        >
          <div className="govuk-grid-column-one-third ccv2-article-nav-container">
            <TableOfContent />
          </div>
          <div className="govuk-grid-column-two-thirds" ref={mainContentRef}>
            {map(content[blocksLayoutFieldname].items, (block, index) => {
              const Block =
                config.blocks.blocksConfig[
                  content[blocksFieldname]?.[block]?.['@type']
                ]?.['view'] || null;

              const notTitleBlock =
                content[blocksFieldname]?.[block]?.['@type'] !== 'title';
              let displayBack = false;
              let previousBack = false;
              const contentBlock = content[blocksFieldname][block];
              if (contentBlock?.value === undefined) {
                displayBack = true;
              }
              if (previousBlock?.value === undefined) {
                previousBack = true;
              }
              previousBlock = contentBlock;

              return Block !== null && notTitleBlock ? (
                <div id={block} style={{ marginTop: previousBack ? 40 : 0 }}>
                  <Block
                    key={block}
                    id={block}
                    properties={content}
                    data={content[blocksFieldname][block]}
                    path={getBaseUrl(location?.pathname || '')}
                  />
                  {displayBack && screenWidth <= 801 && (
                    <a className="govuk-body-m govuk-link" href={'#navigation'}>
                      Back to contents
                    </a>
                  )}
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
