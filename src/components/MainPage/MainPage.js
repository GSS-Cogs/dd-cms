import React, { Component } from "react";
import { PhaseBanner, Link, GridRow, GridCol, Footer, UnorderedList, ListItem, } from "govuk-react";
import Header from "../Header/Header";
import Crown from "../../../static/images/govuk-crest.png";
import './MainPage.css';
export default class MainPage extends Component {
  render() {
    return (
      <>
        <Header />
        <PhaseBanner level="beta">
          This part of GOV.UK is being rebuilt –{' '}
          <Link href="https://example.com">
            find out what that means
          </Link>
        </PhaseBanner>
        <GridRow>
          <GridCol setWidth="one-quarter">
            <div class="container">
              <UnorderedList>
                <ListItem>
                  List item example
                </ListItem>
              </UnorderedList>
            </div>
          </GridCol>
          <GridCol>
            <div>
            </div>
          </GridCol>
        </GridRow>
        <Footer
          copyright={{
            image: {
              height: 102,
              src: { Crown },
              width: 125
            },
            link: 'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
            text: 'Crown copyright'
          }}
        />
      </>
    );
  }
}
