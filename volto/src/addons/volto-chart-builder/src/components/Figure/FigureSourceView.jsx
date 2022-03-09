import React from 'react';

export const FigureSourceView = ({ data }) => {
  const sources = [
    { text: data.text, url: data.url },
    { text: data.text1, url: data.url1 },
    { text: data.text2, url: data.url2 },
  ].filter(({ text, url }) => {
    return text && url;
  });

  const isLastItem = (index) => index == sources.length - 1;

  return (
    <p className="govuk-!-margin-top-6 govuk-caption-m">
      Source:{' '}
      {sources.map(({ text, url }, index) => {
        return (
          <>
            <a href={url} className="govuk-link">
              {text}
            </a>
            {isLastItem(index) ? '' : ', '}
          </>
        );
      })}
    </p>
  );
};
