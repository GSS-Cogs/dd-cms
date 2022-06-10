function SuperNavigationHeaderFooterList(props) {
    return (
        [
            <hr 
                className="gem-c-layout-super-navigation-header__navigation-second-footer-break govuk-section-break govuk-section-break--visible"
                key="footer-break" 
            />,

            <ul className="gem-c-layout-super-navigation-header__navigation-second-footer-list" key="footer-list">
                {props.footer_links.map((footer_item, index) => {
                    return (
                        <li className="gem-c-layout-super-navigation-header__navigation-second-footer-item" key={index}>
                            <a 
                                className="govuk-link gem-c-layout-super-navigation-header__navigation-second-footer-link"
                                data-track-label={footer_item.href}
                                data-track-dimension={footer_item.label}
                                href={footer_item.href}
                            >
                                {footer_item.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        ]
    )
};

export { SuperNavigationHeaderFooterList };