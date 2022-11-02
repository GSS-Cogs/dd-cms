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

  const [contentHeaders, setContentHeaders] = useState([]);
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
  }, []);

  let previousBlock = [];

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
            height:
              screenWidth <= 801
                ? '100%'
                : mainContentRef.current === null
                ? 1000
                : mainContentRef.current.clientHeight,
          }}
        >
          <div className="govuk-grid-column-one-third ccv2-article-nav-container">
            <nav className="ccv2-article-nav">
              <h3 className="ccv2-article-nav--title">Contents</h3>
              <ul className="govuk-list">
                {contentHeaders.length > 0 &&
                  contentHeaders.map((item, index) => {
                    return (
                      <li>
                        <a className="govuk-link" href={'#' + item.id}>
                          {item.text}
                        </a>
                        <ul className="govuk-list">
                          {contentHeaders[index].sub.length > 0 &&
                            contentHeaders[index].sub.map((subitem) => {
                              return (
                                <li>
                                  <a
                                    className="govuk-link"
                                    href={'#' + subitem.id}
                                  >
                                    {subitem.text}
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </nav>
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
                <>
                  <div id={block} style={{ marginTop: previousBack ? 40 : 0 }}>
                    <Block
                      key={block}
                      id={block}
                      properties={content}
                      data={content[blocksFieldname][block]}
                      path={getBaseUrl(location?.pathname || '')}
                    />
                    {displayBack && screenWidth <= 801 && (
                      <a
                        className="govuk-body-m govuk-link"
                        href={'#navigation'}
                      >
                        Back to contents
                      </a>
                    )}
                  </div>
                </>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
