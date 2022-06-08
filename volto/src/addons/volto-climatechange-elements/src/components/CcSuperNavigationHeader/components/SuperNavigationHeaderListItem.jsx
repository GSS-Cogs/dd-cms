function SuperNavigationHeaderListItem(props) {
    return (
        <li className="gem-c-layout-super-navigation-header__dropdown-list-item">
            <a 
                className="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link"
                href={props.menu_item.href}
            >
                {props.menu_item.label}
            </a>
            {
                props.menu_item.description ? (
                    <p className="gem-c-layout-super-navigation-header__navigation-second-item-description">
                        {props.menu_item.description}
                    </p>) : null
            }

        </li>
    )
}

export { SuperNavigationHeaderListItem };