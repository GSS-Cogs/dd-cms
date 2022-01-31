import React, { Component } from 'react';
import PropTypes from 'prop-types';


class SideNav extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };
  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs SideNav
   */
  constructor(props) {
    super(props);
    const { items } = props;
  }

  render() {
    return (
      <aside>
        <nav>
          <ul>
            {this.props.items.map((item) => (
              <li key={item.url}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))
            }
          </ul>
        </nav>
      </aside>
    );
  }
}

export default SideNav;
