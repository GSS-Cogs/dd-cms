/**
 * Document view component.
 * @module components/theme/View/FigureView
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { map } from 'lodash';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';
import config from '@plone/volto/registry';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

import { classes } from '../../utils';
import { FigureTitleView } from './FigureTitleView';
import './figure.scss';

const convertToAlphaNumericSnakeCase = (str) => {
  return str
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
};

function toggleDisplay(className, displayState) {
  var elements = document.getElementsByClassName(className);

  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = displayState;
  }
}

const FigureViewComponent = ({ content, location }) => {
  const [loadSecondFigure, setLoadSecondFigure] = useState(false);

  useEffect(() => {
    if (loadSecondFigure) {
      onPublishClick(id);
    }
  }, [loadSecondFigure]);

  const FigureBlock = (compId) => {
    const style = compId.id === '' ? '' : `figure ${customClasses}`;
    return (
      <div id={compId.id} className={style}>
        {map(content[blocksLayoutFieldname].items, (block) => {
          const isTitleBlock =
            content[blocksFieldname]?.[block]?.['@type'] === 'title';

          let Block = isTitleBlock
            ? (props) => <FigureTitleView {...props} />
            : config.blocks.blocksConfig[
                content[blocksFieldname]?.[block]?.['@type']
              ]?.['view'] || null;

          return Block !== null ? (
            <Block
              key={block}
              id={block}
              properties={content}
              data={content[blocksFieldname][block]}
              path={getBaseUrl(location?.pathname || '')}
            />
          ) : null;
        })}
      </div>
    );
  };

  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const customClasses = classes([
    {
      val: content.Background ? content.Background.title : null,
      prefix: 'figure--bg-',
    },
  ]);

  const onPublishClick = (id) => {
    const node = document.getElementById(id);
    // temporarily add 32px padding either side of the figure to give the downloaded image space around it
    node.classList.add('pad-for-download');
    // hide any elements that should not be included in the image (e.g. the Download button)
    toggleDisplay('non-content', 'none');
    domtoimage.toBlob(node).then(function (blob) {
      // now we have the blob, show the hidden elements again
      toggleDisplay('non-content', 'block');
      // and remove the extra padding
      node.classList.remove('pad-for-download');
      saveAs(blob, `${filename}.png`);
      setLoadSecondFigure(false);
    });
  };

  const id = uuidv4();

  const filename = convertToAlphaNumericSnakeCase(content.title);

  return hasBlocksData(content) ? (
    <>
      <div className={`figure ${customClasses}`}>
        <FigureBlock id="" />
        <button
          className="govuk-button govuk-button--secondary non-content"
          data-module="govuk-button"
          onClick={() => setLoadSecondFigure(true)}
        >
          Download Figure
        </button>
        {loadSecondFigure && (
          <div
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          >
            <FigureBlock id={id} />
          </div>
        )}
      </div>
    </>
  ) : (
    <div>Add Figure Block</div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FigureViewComponent.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export const FigureView = injectIntl(FigureViewComponent);
