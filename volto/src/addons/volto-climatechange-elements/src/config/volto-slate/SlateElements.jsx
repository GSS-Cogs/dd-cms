export const elements = {
    default: ({ attributes, children }) => <p className="govuk-body" {...attributes}>{children}</p>,
  
    h1: ({ attributes, children }) => <h1 className="govuk-heading-xl" {...attributes}>{children}</h1>,
    h2: ({ attributes, children }) => <h2 className="govuk-heading-l" {...attributes}>{children}</h2>,
    h3: ({ attributes, children }) => <h3 className="govuk-heading-m" {...attributes}>{children}</h3>,
    h4: ({ attributes, children }) => <h4 className="govuk-heading-s" {...attributes}>{children}</h4>,
  
    li: ({ attributes, children }) => <li {...attributes}>{children}</li>,
    ol: ({ attributes, children }) => <ol className="govuk-list govuk-list--number" {...attributes}>{children}</ol>,
    ul: ({ attributes, children }) => {
      return <ul className="govuk-list govuk-list--bullet" {...attributes}>{children}</ul>;
    },
  
    div: ({ attributes, children }) => <div {...attributes}>{children}</div>,
    p: ({ attributes, children }) => {
      return <p className="govuk-body" {...attributes}>{children}</p>;
    },
  
    // While usual slate editor consider these to be Leafs, we treat them as
    // inline elements because they can sometimes contain elements (ex:
    // <b><a/></b>
    em: ({ children }) => <em>{children}</em>,
    i: ({ children }) => <i>{children}</i>,
    b: ({ children }) => {
      return <b className="govuk-typography-weight-bold">{children}</b>;
    },
    strong: ({ children }) => {
      return <strong className="govuk-typography-weight-bold">{children}</strong>;
    },
    u: ({ children }) => <u>{children}</u>,
    s: ({ children }) => <del>{children}</del>,
    del: ({ children }) => <del>{children}</del>,
    sub: ({ children }) => <sub>{children}</sub>,
    sup: ({ children }) => <sup>{children}</sup>,
    code: ({ children }) => <code>{children}</code>
  };