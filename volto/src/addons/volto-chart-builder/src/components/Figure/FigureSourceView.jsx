import React from 'react';

export const FigureSourceView = ({ data }) => {
  const sources = [
    { text: data.text, url: data.url },
    { text: data.text1, url: data.url1 },
    { text: data.text2, url: data.url2 },
  ].filter((source) => source.text !== '');

  const isLastItem = (index) => index == sources.length - 1;

  return (
    <p className="figure__text govuk-!-margin-top-6 govuk-caption-m">
      Source:{' '}
      {sources.map(({ text, url }, index) => {
        return (
          <span key={text}>
            {url ? (
              <a href={url} className="govuk-link">
                {text}
              </a>
            ) : (
              <span>{text}</span>
            )}

            {isLastItem(index) ? '' : ', '}
          </span>
        );
      })}
    </p>
  );
};
