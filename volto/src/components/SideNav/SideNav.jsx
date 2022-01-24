import React, { Component } from 'react';

class SideNav extends Component {
  render() {
    return (
      <aside className="side-menu">
        <div className="side-menu__overlay" />
        <div className="side-menu__content">Side bar</div>
      </aside>
    );
  }
}

export default SideNav;
