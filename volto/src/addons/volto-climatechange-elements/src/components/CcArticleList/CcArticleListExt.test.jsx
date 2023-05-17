import React from 'react';
import renderer from 'react-test-renderer';
import { CcArticleListExt } from './CcArticleListExt';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

describe('CcArticleListExt', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    relatedItemsData: {
      error: null,
      items: [],
      data: [
        {
          '@id':
            'http://localhost:3000/articles/climate-change-insights-uk-august-2022',
          '@type': 'Link',
          CreationDate: '2022-08-19T13:09:55+00:00',
          Creator: 'Climate change team',
          Date: '2022-11-11T09:30:00+00:00',
          Description:
            "Latest climate change-related analysis using a range of UK official statistics. This edition centres around the theme of 'Natural and Rural Environments'.",
          EffectiveDate: '2022-11-11T09:30:00+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2023-03-23T08:57:04+00:00',
          Subject: [],
          Title:
            'Climate Change Insights, Natural and Rural Environments, UK: November 2022',
          Type: 'Link',
          UID: '29cbacf2b1404bae803f855d68bab148',
          author_name: null,
          cmf_uid: 14,
          commentators: [],
          created: '2022-08-19T13:09:55+00:00',
          description:
            "Latest climate change-related analysis using a range of UK official statistics. This edition centres around the theme of 'Natural and Rural Environments'.",
          effective: '2022-11-11T09:30:00+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId: 'climate-change-insights-uk-august-2022',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/articles/climate-change-insights-uk-august-2022',
          getRemoteUrl:
            'https://www.ons.gov.uk/economy/environmentalaccounts/articles/climatechangeinsightsuk/november2022',
          getURL:
            'http://localhost:3000/articles/climate-change-insights-uk-august-2022',
          hasPreviewImage: null,
          head_title: null,
          id: 'climate-change-insights-uk-august-2022',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['Climate change team'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2023-03-23T08:57:04+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title:
            'Climate Change Insights, Natural and Rural Environments, UK: November 2022',
          total_comments: 0,
        },
        {
          '@id':
            'http://localhost:3000/references/met-office-2014-causes-of-climate-change',
          '@type': 'Link',
          CreationDate: '2022-06-14T10:16:22+00:00',
          Creator: '2bdc1d87-83ae-4549-8ebf-ffdd7eb572ee',
          Date: '2022-06-14T10:16:27+00:00',
          Description:
            'The evidence is clear: the main cause of climate change is burning fossil fuels such as oil, gas, and coal. When burnt, fossil fuels release carbon dioxide into the air, causing the planet to heat up.',
          EffectiveDate: '2022-06-14T10:16:27+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2022-09-07T10:55:21+00:00',
          Subject: [],
          Title: 'Met Office — Causes of Climate Change',
          Type: 'Link',
          UID: '9be2e2796b644a3393c0b202c0c7c75d',
          author_name: null,
          cmf_uid: 6,
          commentators: [],
          created: '2022-06-14T10:16:22+00:00',
          description:
            'The evidence is clear: the main cause of climate change is burning fossil fuels such as oil, gas, and coal. When burnt, fossil fuels release carbon dioxide into the air, causing the planet to heat up.',
          effective: '2022-06-14T10:16:27+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId: 'met-office-2014-causes-of-climate-change',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/references/met-office-2014-causes-of-climate-change',
          getRemoteUrl:
            'https://www.metoffice.gov.uk/weather/climate-change/causes-of-climate-change',
          getURL:
            'http://localhost:3000/references/met-office-2014-causes-of-climate-change',
          hasPreviewImage: null,
          head_title: null,
          id: 'met-office-2014-causes-of-climate-change',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['2bdc1d87-83ae-4549-8ebf-ffdd7eb572ee'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2022-09-07T10:55:21+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title: 'Met Office — Causes of Climate Change',
          total_comments: 0,
        },
        {
          '@id':
            'http://localhost:3000/references/forest-research-2014-climate-change-impacts',
          '@type': 'Link',
          CreationDate: '2022-06-14T10:17:08+00:00',
          Creator: '2bdc1d87-83ae-4549-8ebf-ffdd7eb572ee',
          Date: '2022-06-14T10:17:37+00:00',
          Description:
            'The climate is changing, and we need to understand the impacts this is having now and will have in the future on our trees and woodlands, in Britain and elsewhere.',
          EffectiveDate: '2022-06-14T10:17:37+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2022-09-07T10:55:21+00:00',
          Subject: [],
          Title: 'Forest Research — Climate change impacts',
          Type: 'Link',
          UID: 'a77836a36b154dc6961eaeaacd0ee661',
          author_name: null,
          cmf_uid: 8,
          commentators: [],
          created: '2022-06-14T10:17:08+00:00',
          description:
            'The climate is changing, and we need to understand the impacts this is having now and will have in the future on our trees and woodlands, in Britain and elsewhere.',
          effective: '2022-06-14T10:17:37+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId: 'forest-research-2014-climate-change-impacts',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/references/forest-research-2014-climate-change-impacts',
          getRemoteUrl:
            'https://www.forestresearch.gov.uk/research/climate-change-impacts/',
          getURL:
            'http://localhost:3000/references/forest-research-2014-climate-change-impacts',
          hasPreviewImage: null,
          head_title: null,
          id: 'forest-research-2014-climate-change-impacts',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['2bdc1d87-83ae-4549-8ebf-ffdd7eb572ee'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2022-09-07T10:55:21+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title: 'Forest Research — Climate change impacts',
          total_comments: 0,
        },
        {
          '@id':
            'http://localhost:3000/references/department-for-business-energy-industrial-strategy-net-zero-strategy-build-back-greener',
          '@type': 'Link',
          CreationDate: '2022-09-28T07:12:04+00:00',
          Creator: '6c2a3896-2cdc-45cb-9044-5b4783b45d51',
          Date: '2022-09-28T07:27:45+00:00',
          Description:
            'This strategy sets out policies and proposals for decarbonising all sectors of the UK economy to meet our net zero target by 2050.',
          EffectiveDate: '2022-09-28T07:27:45+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2022-09-28T07:41:31+00:00',
          Subject: [],
          Title:
            'Department for Business, Energy & Industrial Strategy — Net Zero Strategy: Build Back Greener',
          Type: 'Link',
          UID: '1a08ba3d877840f7b9e6ba7d0cf30aef',
          author_name: null,
          cmf_uid: 17,
          commentators: [],
          created: '2022-09-28T07:12:04+00:00',
          description:
            'This strategy sets out policies and proposals for decarbonising all sectors of the UK economy to meet our net zero target by 2050.',
          effective: '2022-09-28T07:27:45+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId:
            'department-for-business-energy-industrial-strategy-net-zero-strategy-build-back-greener',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/references/department-for-business-energy-industrial-strategy-net-zero-strategy-build-back-greener',
          getRemoteUrl:
            'https://www.gov.uk/government/publications/net-zero-strategy',
          getURL:
            'http://localhost:3000/references/department-for-business-energy-industrial-strategy-net-zero-strategy-build-back-greener',
          hasPreviewImage: null,
          head_title: null,
          id:
            'department-for-business-energy-industrial-strategy-net-zero-strategy-build-back-greener',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['6c2a3896-2cdc-45cb-9044-5b4783b45d51'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2022-09-28T07:41:31+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title:
            'Department for Business, Energy & Industrial Strategy — Net Zero Strategy: Build Back Greener',
          total_comments: 0,
        },
        {
          '@id':
            'http://localhost:3000/references/climate-change-insights-uk-may-2022',
          '@type': 'Link',
          CreationDate: '2022-09-28T07:32:33+00:00',
          Creator: '6c2a3896-2cdc-45cb-9044-5b4783b45d51',
          Date: '2022-09-28T07:36:37+00:00',
          Description:
            'Quarterly publication bringing together the latest climate change-related statistics and analysis from a range of sources.',
          EffectiveDate: '2022-09-28T07:36:37+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2022-09-28T07:36:37+00:00',
          Subject: [],
          Title: 'Climate Change Insights, UK: May 2022',
          Type: 'Link',
          UID: '24c3d0c6fbe94af9a8d368d026df02a0',
          author_name: null,
          cmf_uid: 18,
          commentators: [],
          created: '2022-09-28T07:32:33+00:00',
          description:
            'Quarterly publication bringing together the latest climate change-related statistics and analysis from a range of sources.',
          effective: '2022-09-28T07:36:37+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId: 'climate-change-insights-uk-may-2022',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/references/climate-change-insights-uk-may-2022',
          getRemoteUrl:
            'https://www.ons.gov.uk/economy/environmentalaccounts/articles/climatechangeinsightsuk/may2022',
          getURL:
            'http://localhost:3000/references/climate-change-insights-uk-may-2022',
          hasPreviewImage: null,
          head_title: null,
          id: 'climate-change-insights-uk-may-2022',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['6c2a3896-2cdc-45cb-9044-5b4783b45d51'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2022-09-28T07:36:37+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title: 'Climate Change Insights, UK: May 2022',
          total_comments: 0,
        },
        {
          '@id':
            'http://localhost:3000/references/worries-about-climate-change-great-britain-september-to-october-2022',
          '@type': 'Link',
          CreationDate: '2022-11-10T08:13:28+00:00',
          Creator: '6c2a3896-2cdc-45cb-9044-5b4783b45d51',
          Date: '2022-10-28T08:30:00+00:00',
          Description:
            "An article covering people's worries about climate change, using data from the Opinions and Lifestyle Survey collected between 14 September and 9 October 2022 and based on adults in Great Britain aged 16 years and over.",
          EffectiveDate: '2022-10-28T08:30:00+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2022-11-10T08:13:28+00:00',
          Subject: [],
          Title:
            'Worries about climate change, Great Britain: September to October 2022',
          Type: 'Link',
          UID: '4210f5f58c524c40b760fa4538be1130',
          author_name: null,
          cmf_uid: 19,
          commentators: [],
          created: '2022-11-10T08:13:28+00:00',
          description:
            "An article covering people's worries about climate change, using data from the Opinions and Lifestyle Survey collected between 14 September and 9 October 2022 and based on adults in Great Britain aged 16 years and over.",
          effective: '2022-10-28T08:30:00+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId:
            'worries-about-climate-change-great-britain-september-to-october-2022',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/references/worries-about-climate-change-great-britain-september-to-october-2022',
          getRemoteUrl:
            'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/articles/worriesaboutclimatechangegreatbritain/septembertooctober2022',
          getURL:
            'http://localhost:3000/references/worries-about-climate-change-great-britain-september-to-october-2022',
          hasPreviewImage: null,
          head_title: null,
          id:
            'worries-about-climate-change-great-britain-september-to-october-2022',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['6c2a3896-2cdc-45cb-9044-5b4783b45d51'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2022-11-10T08:13:28+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title:
            'Worries about climate change, Great Britain: September to October 2022',
          total_comments: 0,
        },
        {
          '@id':
            'http://localhost:3000/references/climate-change-insights-families-and-households-uk-august-2022',
          '@type': 'Link',
          CreationDate: '2022-11-16T09:46:23+00:00',
          Creator: '6c2a3896-2cdc-45cb-9044-5b4783b45d51',
          Date: '2022-08-12T08:30:00+00:00',
          Description:
            "Quarterly publication bringing together the latest climate change-related statistics and analysis from a range of sources. This edition centres around the theme of 'Families and Households'.",
          EffectiveDate: '2022-08-12T08:30:00+00:00',
          ExpirationDate: 'None',
          ModificationDate: '2022-11-16T09:50:02+00:00',
          Subject: [],
          Title:
            'Climate Change Insights, Families and Households, UK: August 2022',
          Type: 'Link',
          UID: '24bb3e1fb91f48a793fa3e691f39ea1c',
          author_name: null,
          cmf_uid: 20,
          commentators: [],
          created: '2022-11-16T09:46:23+00:00',
          description:
            "Quarterly publication bringing together the latest climate change-related statistics and analysis from a range of sources. This edition centres around the theme of 'Families and Households'.",
          effective: '2022-08-12T08:30:00+00:00',
          end: null,
          exclude_from_nav: false,
          expires: '2499-12-31T00:00:00+00:00',
          getIcon: null,
          getId:
            'climate-change-insights-families-and-households-uk-august-2022',
          getObjSize: '0 KB',
          getPath:
            '/climate-change/references/climate-change-insights-families-and-households-uk-august-2022',
          getRemoteUrl:
            'https://www.ons.gov.uk/economy/environmentalaccounts/articles/climatechangeinsightsuk/august2022',
          getURL:
            'http://localhost:3000/references/climate-change-insights-families-and-households-uk-august-2022',
          hasPreviewImage: null,
          head_title: null,
          id: 'climate-change-insights-families-and-households-uk-august-2022',
          in_response_to: null,
          is_folderish: false,
          last_comment_date: null,
          lead_image: null,
          listCreators: ['6c2a3896-2cdc-45cb-9044-5b4783b45d51'],
          location: null,
          meta_type: 'Dexterity Item',
          mime_type: 'text/plain',
          modified: '2022-11-16T09:50:02+00:00',
          nav_title: null,
          portal_type: 'Link',
          review_state: 'published',
          start: null,
          sync_uid: null,
          title:
            'Climate Change Insights, Families and Households, UK: August 2022',
          total_comments: 0,
        },
      ],
      loaded: true,
      loading: false,
      loadedId: null,
    },
    folderishContent: {
      'articles?metadata_fields=_all': {
        loading: false,
        loaded: true,
        data: {
          '@components': {
            actions: {
              '@id': 'http://localhost:3000/articles/@actions',
            },
            breadcrumbs: {
              '@id': 'http://localhost:3000/articles/@breadcrumbs',
            },
            contextnavigation: {
              '@id': 'http://localhost:3000/articles/@contextnavigation',
            },
            localnavigation: {
              '@id': 'http://localhost:3000/articles/@localnavigation',
            },
            navigation: {
              '@id': 'http://localhost:3000/articles/@navigation',
            },
            siblings: {
              '@id': 'http://localhost:3000/articles/@siblings',
            },
            types: {
              '@id': 'http://localhost:3000/articles/@types',
            },
            workflow: {
              '@id': 'http://localhost:3000/articles/@workflow',
            },
          },
          '@id': 'http://localhost:3000/articles',
          '@type': 'Folder',
          UID: '75faa024973045ff90bfa67d39edfff2',
          allow_discussion: false,
          contributors: [],
          created: '2022-05-13T12:01:03+00:00',
          creators: ['2bdc1d87-83ae-4549-8ebf-ffdd7eb572ee'],
          description: '',
          effective: '2022-05-17T20:40:14',
          exclude_from_nav: false,
          expires: null,
          id: 'articles',
          is_folderish: true,
          items: [
            {
              '@id': 'http://localhost:3000/articles/uk-climate-is-changing',
              '@type': 'Document',
              CreationDate: '2022-09-26T22:29:02+00:00',
              Creator: 'Climate change team',
              Date: '2021-11-01T23:43:00+00:00',
              Description:
                'The latest report from the Intergovernmental Panel on Climate Change (IPCC), a United Nations body providing science-led comprehensive assessments of climate change science, found that climate change is already happening, with global surface temperatures between 2001 and 2020 around 1°C higher than during 1850 to 1900, and that this is having effects across the world and in the UK including making extreme weather events more likely.',
              EffectiveDate: '2021-11-01T23:43:00+00:00',
              ExpirationDate: 'None',
              ModificationDate: '2023-03-23T08:57:04+00:00',
              Subject: [],
              Title:
                'The UK’s climate is changing. What is driving this? How is the UK responding?',
              Type: 'Page',
              UID: '8a227188569043369e4ff4b8f3947ffa',
              author_name: null,
              cmf_uid: null,
              commentators: [],
              created: '2022-09-26T22:29:02+00:00',
              description:
                'The latest report from the Intergovernmental Panel on Climate Change (IPCC), a United Nations body providing science-led comprehensive assessments of climate change science, found that climate change is already happening, with global surface temperatures between 2001 and 2020 around 1°C higher than during 1850 to 1900, and that this is having effects across the world and in the UK including making extreme weather events more likely.',
              effective: '2021-11-01T23:43:00+00:00',
              end: null,
              exclude_from_nav: false,
              expires: '2499-12-31T00:00:00+00:00',
              getIcon: null,
              getId: 'uk-climate-is-changing',
              getObjSize: '0 KB',
              getPath: '/climate-change/articles/uk-climate-is-changing',
              getRemoteUrl: null,
              getURL: 'http://localhost:3000/articles/uk-climate-is-changing',
              hasPreviewImage: false,
              head_title: null,
              id: 'uk-climate-is-changing',
              in_response_to: null,
              is_folderish: true,
              last_comment_date: null,
              lead_image: null,
              listCreators: ['Climate change team'],
              location: null,
              meta_type: 'Dexterity Container',
              mime_type: 'text/plain',
              modified: '2023-03-23T08:57:04+00:00',
              nav_title: null,
              portal_type: 'Document',
              review_state: 'published',
              start: null,
              sync_uid: null,
              title:
                'The UK’s climate is changing. What is driving this? How is the UK responding?',
              total_comments: 0,
            },
            {
              '@id':
                'http://localhost:3000/articles/climate-change-insights-uk-august-2022',
              '@type': 'Link',
              CreationDate: '2022-08-19T13:09:55+00:00',
              Creator: 'Climate change team',
              Date: '2022-11-11T09:30:00+00:00',
              Description:
                "Latest climate change-related analysis using a range of UK official statistics. This edition centres around the theme of 'Natural and Rural Environments'.",
              EffectiveDate: '2022-11-11T09:30:00+00:00',
              ExpirationDate: 'None',
              ModificationDate: '2023-03-23T08:57:04+00:00',
              Subject: [],
              Title:
                'Climate Change Insights, Natural and Rural Environments, UK: November 2022',
              Type: 'Link',
              UID: '29cbacf2b1404bae803f855d68bab148',
              author_name: null,
              cmf_uid: 14,
              commentators: [],
              created: '2022-08-19T13:09:55+00:00',
              description:
                "Latest climate change-related analysis using a range of UK official statistics. This edition centres around the theme of 'Natural and Rural Environments'.",
              effective: '2022-11-11T09:30:00+00:00',
              end: null,
              exclude_from_nav: false,
              expires: '2499-12-31T00:00:00+00:00',
              getIcon: null,
              getId: 'climate-change-insights-uk-august-2022',
              getObjSize: '0 KB',
              getPath:
                '/climate-change/articles/climate-change-insights-uk-august-2022',
              getRemoteUrl:
                'https://www.ons.gov.uk/economy/environmentalaccounts/articles/climatechangeinsightsuk/november2022',
              getURL:
                'http://localhost:3000/articles/climate-change-insights-uk-august-2022',
              hasPreviewImage: null,
              head_title: null,
              id: 'climate-change-insights-uk-august-2022',
              in_response_to: null,
              is_folderish: false,
              last_comment_date: null,
              lead_image: null,
              listCreators: ['Climate change team'],
              location: null,
              meta_type: 'Dexterity Item',
              mime_type: 'text/plain',
              modified: '2023-03-23T08:57:04+00:00',
              nav_title: null,
              portal_type: 'Link',
              review_state: 'published',
              start: null,
              sync_uid: null,
              title:
                'Climate Change Insights, Natural and Rural Environments, UK: November 2022',
              total_comments: 0,
            },
            {
              '@id':
                'http://localhost:3000/articles/measuring-greenhouse-gas-emissions',
              '@type': 'Document',
              CreationDate: '2022-03-29T14:30:15+00:00',
              Creator: 'Climate change team',
              Date: '2021-11-01T12:40:00+00:00',
              Description:
                'The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of different bases (territorial, residence and footprint) to fulfil a wide range of international agreements as well as for domestic policy making purposes. The three key official measures of UK GHG emissions, territorial, residence and footprint, are explored and defined below.',
              EffectiveDate: '2021-11-01T12:40:00+00:00',
              ExpirationDate: 'None',
              ModificationDate: '2023-03-23T08:57:04+00:00',
              Subject: [],
              Title: 'Measuring UK greenhouse gas emissions',
              Type: 'Page',
              UID: 'f247e4eafab549cfb0467c1722999324',
              author_name: null,
              cmf_uid: null,
              commentators: [],
              created: '2022-03-29T14:30:15+00:00',
              description:
                'The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of different bases (territorial, residence and footprint) to fulfil a wide range of international agreements as well as for domestic policy making purposes. The three key official measures of UK GHG emissions, territorial, residence and footprint, are explored and defined below.',
              effective: '2021-11-01T12:40:00+00:00',
              end: null,
              exclude_from_nav: false,
              expires: '2499-12-31T00:00:00+00:00',
              getIcon: null,
              getId: 'measuring-greenhouse-gas-emissions',
              getObjSize: '0 KB',
              getPath:
                '/climate-change/articles/measuring-greenhouse-gas-emissions',
              getRemoteUrl: null,
              getURL:
                'http://localhost:3000/articles/measuring-greenhouse-gas-emissions',
              hasPreviewImage: false,
              head_title: null,
              id: 'measuring-greenhouse-gas-emissions',
              in_response_to: null,
              is_folderish: true,
              last_comment_date: null,
              lead_image: null,
              listCreators: ['Climate change team'],
              location: null,
              meta_type: 'Dexterity Container',
              mime_type: 'text/plain',
              modified: '2023-03-23T08:57:04+00:00',
              nav_title: null,
              portal_type: 'Document',
              review_state: 'published',
              start: null,
              sync_uid: null,
              title: 'Measuring UK greenhouse gas emissions',
              total_comments: 0,
            },
            {
              '@id':
                'http://localhost:3000/articles/emissions-embedded-in-trade-and-impacts-on-climate-change',
              '@type': 'Document',
              CreationDate: '2022-03-29T14:30:31+00:00',
              Creator: 'Climate change team',
              Date: '2021-11-01T11:37:00+00:00',
              Description:
                'Providing services — including financial, legal and communications services — tends to emit fewer greenhouse gas emissions than manufacturing goods such as petroleum products, iron, steel or concrete.',
              EffectiveDate: '2021-11-01T11:37:00+00:00',
              ExpirationDate: 'None',
              ModificationDate: '2023-03-23T08:57:05+00:00',
              Subject: [],
              Title:
                'Emissions embedded in trade and impacts on climate change',
              Type: 'Page',
              UID: 'f52fe21f6fd04cd38ae5083d690ee50a',
              author_name: null,
              cmf_uid: null,
              commentators: [],
              created: '2022-03-29T14:30:31+00:00',
              description:
                'Providing services — including financial, legal and communications services — tends to emit fewer greenhouse gas emissions than manufacturing goods such as petroleum products, iron, steel or concrete.',
              effective: '2021-11-01T11:37:00+00:00',
              end: null,
              exclude_from_nav: false,
              expires: '2499-12-31T00:00:00+00:00',
              getIcon: null,
              getId:
                'emissions-embedded-in-trade-and-impacts-on-climate-change',
              getObjSize: '0 KB',
              getPath:
                '/climate-change/articles/emissions-embedded-in-trade-and-impacts-on-climate-change',
              getRemoteUrl: null,
              getURL:
                'http://localhost:3000/articles/emissions-embedded-in-trade-and-impacts-on-climate-change',
              hasPreviewImage: false,
              head_title: null,
              id: 'emissions-embedded-in-trade-and-impacts-on-climate-change',
              in_response_to: null,
              is_folderish: true,
              last_comment_date: null,
              lead_image: null,
              listCreators: ['Climate change team'],
              location: null,
              meta_type: 'Dexterity Container',
              mime_type: 'text/plain',
              modified: '2023-03-23T08:57:05+00:00',
              nav_title: null,
              portal_type: 'Document',
              review_state: 'published',
              start: null,
              sync_uid: null,
              title:
                'Emissions embedded in trade and impacts on climate change',
              total_comments: 0,
            },
          ],
          items_total: 4,
          language: {
            title: 'English',
            token: 'en',
          },
          layout: 'cc_article_list_ext',
          lock: {},
          modified: '2023-03-23T08:57:06+00:00',
          nextPreviousEnabled: false,
          next_item: {
            '@id': 'http://localhost:3000/data-sources',
            '@type': 'Folder',
            description:
              'The queries that drive the overview tiles on the front page',
            title: 'Overview Data',
          },
          parent: {
            '@id': 'http://localhost:3000',
            '@type': 'Plone Site',
            description:
              'A prototype portal for data and insights on climate change.',
            title: '',
          },
          previous_item: {
            '@id': 'http://localhost:3000/dashboards',
            '@type': 'Folder',
            description:
              'Dashboards about the different indicators of climate change',
            title: 'Dashboards',
          },
          relatedItems: [],
          review_state: 'published',
          rights: '',
          subjects: [],
          title: 'Articles',
          version: 'current',
          working_copy: null,
          working_copy_of: null,
        },
      },
    },
  });
  const mockContent = {
    '@components': {
      actions: {
        '@id': 'http://localhost:3000/articles/@actions',
      },
      breadcrumbs: {
        '@id': 'http://localhost:3000/articles/@breadcrumbs',
      },
      contextnavigation: {
        '@id': 'http://localhost:3000/articles/@contextnavigation',
      },
      localnavigation: {
        '@id': 'http://localhost:3000/articles/@localnavigation',
      },
      navigation: {
        '@id': 'http://localhost:3000/articles/@navigation',
      },
      siblings: {
        '@id': 'http://localhost:3000/articles/@siblings',
      },
      types: {
        '@id': 'http://localhost:3000/articles/@types',
      },
      workflow: {
        '@id': 'http://localhost:3000/articles/@workflow',
      },
    },
    '@id': 'http://localhost:3000/articles',
    '@type': 'Folder',
    UID: '75faa024973045ff90bfa67d39edfff2',
    allow_discussion: false,
    contributors: [],
    created: '2022-05-13T12:01:03+00:00',
    creators: ['2bdc1d87-83ae-4549-8ebf-ffdd7eb572ee'],
    description: '',
    effective: '2022-05-17T20:40:14',
    exclude_from_nav: false,
    expires: null,
    id: 'articles',
    is_folderish: true,
    items: [
      {
        '@id': 'http://localhost:3000/articles/uk-climate-is-changing',
        '@type': 'Document',
        description:
          'The latest report from the Intergovernmental Panel on Climate Change (IPCC), a United Nations body providing science-led comprehensive assessments of climate change science, found that climate change is already happening, with global surface temperatures between 2001 and 2020 around 1°C higher than during 1850 to 1900, and that this is having effects across the world and in the UK including making extreme weather events more likely.',
        review_state: 'published',
        title:
          'The UK’s climate is changing. What is driving this? How is the UK responding?',
        url: '/articles/uk-climate-is-changing',
      },
    ],
    items_total: 4,
    language: {
      title: 'English',
      token: 'en',
    },
    layout: 'cc_article_list_ext',
    lock: {},
    modified: '2023-03-23T08:57:06+00:00',
    nextPreviousEnabled: false,
    next_item: {
      '@id': 'http://localhost:3000/data-sources',
      '@type': 'Folder',
      description:
        'The queries that drive the overview tiles on the front page',
      title: 'Overview Data',
    },
    parent: {
      '@id': 'http://localhost:3000',
      '@type': 'Plone Site',
      description:
        'A prototype portal for data and insights on climate change.',
      title: '',
    },
    previous_item: {
      '@id': 'http://localhost:3000/dashboards',
      '@type': 'Folder',
      description:
        'Dashboards about the different indicators of climate change',
      title: 'Dashboards',
    },
    relatedItems: [],
    review_state: 'published',
    rights: '',
    subjects: [],
    title: 'Articles',
    version: 'current',
    working_copy: null,
    working_copy_of: null,
  };

  it('renders article list and related links', async () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CcArticleListExt content={mockContent} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('should not display duplicate articles/links', async () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <CcArticleListExt content={mockContent} />
        </MemoryRouter>
      </Provider>,
    );

    const relatedLinks = component.root.findByProps({
      'data-testid': 'relatedLinks',
    });
    const relatedItemIds = relatedLinks.props.items.map((item) => item['@id']);

    const articleLinks = component.root.findByProps({
      'data-testid': 'articleLinks',
    });
    const articleIds = articleLinks.props.items.map((item) => item['@id']);

    // check that there are no duplicate items in relatedItems
    expect(relatedItemIds.length).toBe(new Set(relatedItemIds).size);
    // check that there are no duplicate items in articleLinks
    expect(articleIds.length).toBe(new Set(articleIds).size);

    const hasDuplicates = relatedItemIds.some((id) => articleIds.includes(id));
    // check that there are no duplicate articles in relatedLinks
    expect(hasDuplicates).toBe(false);
  });
});
