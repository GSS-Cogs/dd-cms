import { SuperNavigationHeaderListItem } from './SuperNavigationHeaderListItem';
import { SuperNavigationHeaderFooterList } from './SuperNavigationHeaderFooterList';

function SuperNavigationHeaderMenuItem(props) {
    return (
        <li className="gem-c-layout-super-navigation-header__navigation-item gem-c-layout-super-navigation-header__navigation-item--with-children">
            <div className="gem-c-layout-super-navigation-header__navigation-toggle-wrapper govuk-clearfix">
                <a
                    className="gem-c-layout-super-navigation-header__navigation-item-link"
                    href={props.menu}
                    hidden="hidden"
                >
                    {props.menu.label}
                </a>
                <button
                    aria-controls={`super-navigation-menu__section-${props.unique_id}`}
                    aria-expanded="false" aria-label="Show Topics menu"
                    className="gem-c-layout-super-navigation-header__navigation-second-toggle-button"
                    data-text-for-hide={`Hide ${props.menu.label} menu`}
                    data-text-for-show={`Show ${props.menu.label} menu`}
                    data-toggle-desktop-group="top"
                    data-toggle-mobile-group="second"
                    id={`super-navigation-menu__section-${props.unique_id}-toggle`}
                    type="button"
                >
                    <span className="gem-c-layout-super-navigation-header__navigation-second-toggle-button-inner">{props.menu.label}</span>
                </button>
            </div>
            <div hidden="hidden" className="gem-c-layout-super-navigation-header__navigation-dropdown-menu" id={`super-navigation-menu__section-${props.unique_id}`}>
                <div className="app-width-container gem-c-layout-super-navigation-header__width-container">
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-one-third-from-desktop">
                            <p className="govuk-body-l gem-c-layout-super-navigation-header__menu-description">
                                {props.menu.description}
                            </p>
                        </div>
                        <div className="govuk-grid-column-two-thirds-from-desktop">
                            <ul
                                className={[
                                    "gem-c-layout-super-navigation-header__navigation-second-items",
                                    `gem-c-layout-super-navigation-header__navigation-second-items--grid-${Math.floor((props.menu.menu_contents.length + 1) / 2) * 2}`,
                                    `${props.menu.footer_links ? "gem-c-layout-super-navigation-header__navigation-second-items--no-padding" : ""}`
                                ].join(" ")}
                            >
                                {
                                    props.menu.menu_contents.map((menu_item, index) => {
                                        return <SuperNavigationHeaderListItem menu_item={menu_item} key={index} />
                                    })
                                }
                            </ul>
                            {
                                props.menu.footer_links ? (
                                    <SuperNavigationHeaderFooterList footer_links={props.menu.footer_links} />
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export { SuperNavigationHeaderMenuItem };