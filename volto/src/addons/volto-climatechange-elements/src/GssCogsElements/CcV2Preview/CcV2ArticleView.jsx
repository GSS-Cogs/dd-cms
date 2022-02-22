import React from 'react';
import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';
import { Paragraph } from 'govuk-react';

export const CcV2ArticleView = ({content}) => {
  const isDynamic = false;
  const getContent = (staticContent, dynamicKey) => isDynamic ? dynamicKey : staticContent;

  const data = {
    title: getContent('Measuring greenhouse gas emissions', content.title),
    summary: getContent('The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of different bases to fulfil a wide range of international agreements as well as for domestic policy making purposes.', content.summary),
    href: '#',
    linkTitle: 'All climate and weather data',
  }

  return (<div>
    <CcArticleHeader
      data={data}
    />
    <div className="govuk-width-container">
      <Paragraph>
        { getContent('The report found unequivocal evidence that observed warming of the climate is a consequence of emissions from human activity that has increased the concentration of greenhouse gases in the global atmosphere. Human induced climate change has already affected the severity and frequency of many types of extreme weather and climate events.', content.body) }
      </Paragraph>
    </div>
  </div>)
};
