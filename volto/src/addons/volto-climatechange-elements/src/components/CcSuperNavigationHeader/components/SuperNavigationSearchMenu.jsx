function SuperNavigationSearchMenu(props) {
  function focusElement(parent) {
    // force focus on input when search is clicked
    if (parent.target.ariaExpanded !== 'false') {
      let node = document.getElementById('search-main-1d4ac258');
      node.focus();
    }
  }

  return [
    <button
      aria-controls="super-search-menu"
      aria-expanded="false"
      aria-label="Show search menu"
      className="gem-c-layout-super-navigation-header__search-toggle-button"
      data-text-for-hide="Hide search menu"
      data-text-for-show="Show search menu"
      data-toggle-mobile-group="top"
      data-toggle-desktop-group="top"
      id="super-search-menu-toggle"
      type="button"
      key="button"
      onClick={focusElement}
    >
      <span className="govuk-visually-hidden">{props.search_text}</span>

      <svg
        className="gem-c-layout-super-navigation-header__search-toggle-button-link-icon"
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
        ></circle>
        <line
          x1="17.8668"
          y1="17.3587"
          x2="26.4475"
          y2="25.9393"
          stroke="currentColor"
          strokeWidth="3"
        ></line>
      </svg>
      <span
        aria-hidden="true"
        className="gem-c-layout-super-navigation-header__navigation-top-toggle-close-icon"
        focusable="false"
      >
        ×
      </span>
    </button>,

    <div
      id="super-search-menu"
      className="gem-c-layout-super-navigation-header__search-items"
      hidden="hidden"
      key="super-search-menu"
    >
      <h3 className="govuk-visually-hidden">
        {props.navigation_search_subheading}
      </h3>
      <div className="gem-c-layout-super-navigation-header__search-item">
        <a
          className="gem-c-layout-super-navigation-header__search-item-link"
          href="/search"
          hidden="hidden"
        >
          <span className="gem-c-layout-super-navigation-header__search-item-link-text">
            {props.search_text}
          </span>
          <svg
            className="gem-c-layout-super-navigation-header__search-item-link-icon"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            // focusable="false"
          >
            <circle
              cx="10.0161"
              cy="10.0161"
              r="8.51613"
              stroke="currentColor"
              strokeWidth="3"
            />
            <line
              x1="15.8668"
              y1="16.3587"
              x2="25.4475"
              y2="25.9393"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </a>
      </div>

      <div className="app-width-container gem-c-layout-super-navigation-header__search-and-popular">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <form
              className="gem-c-layout-super-navigation-header__search-form"
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
                <label
                  htmlFor="search-main-1d4ac258"
                  className="govuk-label govuk-label--m"
                >
                  {props.search_text}
                </label>
                <div className="gem-c-search__item-wrapper">
                  <input
                    enterKeyHint="search"
                    className="gem-c-search__item gem-c-search__input js-class-toggle"
                    id="search-main-1d4ac258"
                    name="SearchableText"
                    title="Search"
                    type="search"
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
      </div>
    </div>,
  ];
}

export { SuperNavigationSearchMenu };
