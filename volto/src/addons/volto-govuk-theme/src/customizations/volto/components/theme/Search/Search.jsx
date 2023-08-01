/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UniversalLink } from '@plone/volto/components';
import { asyncConnect } from '@plone/volto/helpers';
import { FormattedMessage } from 'react-intl';
import { Portal } from 'react-portal';
import { Container, Pagination, Button, Header } from 'semantic-ui-react';
import qs from 'query-string';
import classNames from 'classnames';

import config from '@plone/volto/registry';
import { Helmet } from '@plone/volto/helpers';
import { searchContent } from '@plone/volto/actions';
import { SearchTags, Toolbar, Icon } from '@plone/volto/components';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

/**
 * Search class.
 * @class SearchComponent
 * @extends Component
 */
class Search extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    searchableText: PropTypes.string,
    subject: PropTypes.string,
    path: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
    searchableText: null,
    subject: null,
    path: null,
  };

  constructor(props) {
    super(props);
    this.state = { currentPage: 1, isClient: false, active: 'relevance' };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.doSearch();
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.props.location.search !== nextProps.location.search) {
      this.doSearch();
    }
  };

  /**
   * Search based on the given searchableText, subject and path.
   * @method doSearch
   * @param {string} searchableText The searchable text string
   * @param {string} subject The subject (tag)
   * @param {string} path The path to restrict the search to
   * @returns {undefined}
   */

  doSearch = () => {
    const options = qs.parse(this.props.history.location.search);
    const activeSortOption =
      options['sort_on'] === undefined ? 'relevance' : options['sort_on'];
    this.setState({ currentPage: 1, active: activeSortOption });
    options['use_site_search_settings'] = 1;
    this.props.searchContent('', options);
  };

  handleQueryPaginationChange = (e, { activePage }) => {
    const { settings } = config;
    window.scrollTo(0, 0);
    let options = qs.parse(this.props.history.location.search);
    options['use_site_search_settings'] = 1;

    this.setState({ currentPage: activePage }, () => {
      this.props.searchContent('', {
        ...options,
        b_start: (this.state.currentPage - 1) * settings.defaultPageSize,
      });
    });
  };

  onSortChange = (event, sort_order) => {
    console.log('event', event.target.value);
    let options = qs.parse(this.props.history.location.search);
    options.sort_on = event.target.value;
    options.sort_order = sort_order || 'ascending';
    if (options.sort_on === 'relevance') {
      delete options.sort_on;
      delete options.sort_order;
    }
    let searchParams = qs.stringify(options);
    this.setState({ currentPage: 1, active: options.sort_on }, () => {
      // eslint-disable-next-line no-restricted-globals
      this.props.history.replace({
        search: searchParams,
      });
    });
  };

  showContent() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
    }
  }
}

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

  render() {
    const { settings } = config;
    return (
      <Container id="page-search">
        <Helmet title="Search" />
        <div className="container">
          <article id="content">
            <header>
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                  <form
                    className="gem-c-layout-super-navigation-header__search-form govuk-!-padding-bottom-3"
                    id="search"
                    action="/search"
                    method="get"
                    role="search"
                    aria-label="Site-wide"
                  >
                    <div
                      className="gem-c-search govuk-!-display-none-print gem-c-search--large gem-c-search--on-white gem-c-search--separate-label"
                      data-module="gem-toggle-input-class-on-focus"
                      data-gem-toggle-input-class-on-focus-module-started="true"
                    >
                      <h1 className="documentFirstHeading govuk-label--xl govuk-!-margin-bottom-4 govuk-!-margin-top-8">
                        <FormattedMessage id="Search" defaultMessage="Search" />
                      </h1>
                      <div className="gem-c-search__item-wrapper">
                        <input
                          enterKeyHint="search"
                          className="gem-c-search__item gem-c-search__input js-class-toggle"
                          id="search-main-1d4ac258"
                          name="SearchableText"
                          title="Search"
                          type="search"
                          defaultValue={this.props.searchableText}
                        />
                        <div className="gem-c-search__item gem-c-search__submit-wrapper">
                          <button
                            className="gem-c-search__submit"
                            type="submit"
                            enterKeyHint="search"
                          >
                            Search
                            <svg
                              className="gem-c-search__icon"
                              width="27"
                              height="27"
                              viewBox="0 0 27 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <circle
                                cx="12.0161"
                                cy="11.0161"
                                r="8.51613"
                                stroke="currentColor"
                                strokeWidth="3"
                              />
                              <line
                                x1="17.8668"
                                y1="17.3587"
                                x2="26.4475"
                                y2="25.9393"
                                stroke="currentColor"
                                strokeWidth="3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <SearchTags />

              {this.props.search?.items_total > 0 ? (
                <div className="items_total">
                  <div className="govuk-body govuk-!-font-weight-bold">
                    {this.props.search.items_total}{' '}
                    <FormattedMessage
                      id="results found"
                      defaultMessage="results"
                    />
                  </div>
                  { <Header
                    style={{
                      marginTop: 0,
                    }}
                  >
                    <Header.Content className="header-content">
                      <div class="govuk-form-group">
                        <label class="govuk-label" for="subject">
                          Sort By
                        </label>
                        <select class="govuk-select" id="subject" name="subject" aria-describedby="subject-hint" onChange={this.onSortChange} value={this.state.active}>
                          <option value="Choose">Choose</option>
                          <option value="relevance">relevance</option>
                          <option value="sortable_title">Alphabetically</option>
                          <option value="effective">Date (newest first)</option>
                        </select>
                      </div>
                    </Header.Content>
                  </Header> }
                </div>
              ) : (
                <div>
                  <FormattedMessage
                    id="No results found"
                    defaultMessage="No results found"
                  />
                </div>
              )}
            </header>
            <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--s" />
            <section id="content-core">
              <div className="govuk-!-margin-bottom-9 govuk-!-margin-top-6">
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-two-thirds">
                    {this.props.items.map((item, index) => (
                      <article className="tileItem" key={item['@id']}>
                        <h2 className="tileHeadline govuk-heading-m">
                          <UniversalLink
                            item={item}
                            className="summary url"
                            title={item['@type']}
                            style={{ color: '#1D70B8' }}
                          >
                            {item.title}
                          </UniversalLink>
                        </h2>
                        {item.description && (
                          <div className="tileBody govuk-body-s govuk-!-margin-bottom-2">
                            <span className="description">
                              {item.description}
                            </span>
                          </div>
                        )}
                        <div className="govuk-body-s">
                          <span
                            className="description"
                            style={{ color: '#505A5F' }}
                          >
                            Updated:{' '}
                            {new Date(item.modified).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: '2-digit',
                            })}
                          </span>
                        </div>
                        {/* <div className="tileFooter">
                          <UniversalLink item={item}>
                            <FormattedMessage
                              id="Read More…"
                              defaultMessage="Read More…"
                            />
                          </UniversalLink>
                        </div> */}
                        <div className="visualClear" />
                        {index < this.props.items.length - 1 && (
                          <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--l" />
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              </div>
              {this.props.search?.batching && (
                <div className="search-footer">
                  <Pagination
                    activePage={this.state.currentPage}
                    totalPages={Math.ceil(
                      this.props.search.items_total / settings.defaultPageSize,
                    )}
                    onPageChange={this.handleQueryPaginationChange}
                    firstItem={null}
                    lastItem={null}
                    prevItem={{
                      content: <Icon name={paginationLeftSVG} size="18px" />,
                      icon: true,
                      'aria-disabled': !this.props.search.batching.prev,
                      className: !this.props.search.batching.prev
                        ? 'disabled'
                        : null,
                    }}
                    nextItem={{
                      content: <Icon name={paginationRightSVG} size="18px" />,
                      icon: true,
                      'aria-disabled': !this.props.search.batching.next,
                      className: !this.props.search.batching.next
                        ? 'disabled'
                        : null,
                    }}
                  />
                </div>
              )}
            </section>
          </article>
        </div>
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={<span />}
            />
          </Portal>
        )}
      </Container>
    );
  }
}

export const __test__ = connect(
  (state, props) => ({
    items: state.search.items,
    searchableText: qs.parse(props.history.location.search).SearchableText,
    pathname: props.history.location.pathname,
  }),
  { searchContent },
)(Search);

export default compose(
  connect(
    (state, props) => ({
      items: state.search.items,
      searchableText: qs.parse(props.history.location.search).SearchableText,
      pathname: props.location.pathname,
    }),
    { searchContent },
  ),
  asyncConnect([
    {
      key: 'search',
      promise: ({ location, store: { dispatch } }) =>
        dispatch(
          searchContent('', {
            ...qs.parse(location.search),
            use_site_search_settings: 1,
          }),
        ),
    },
  ]),
)(Search);
