import React, { Component } from "react";
import { TopNav, IconTitle, Anchor } from "govuk-react";
import Crown from "@govuk-react/icon-crown";
export default class Header extends Component {
  render() {
    return (
      <TopNav
        company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle icon={<Crown height="32" width="36" />}>GOV.UK</TopNav.IconTitle></TopNav.Anchor>}
        serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Climate Change</TopNav.NavLink>}
      />
    );
  }
}

