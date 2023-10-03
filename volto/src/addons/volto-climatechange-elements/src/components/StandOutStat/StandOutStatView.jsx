export const StandOutStatView = ({ data }) => {
  const validateValue = (value) => {
    if (value === undefined || value === null) {
      return '';
    }
    return value;
  };
  const fullFigure = validateValue(data?.figure) + validateValue(data?.unit);

  return (
    <main>
      <div className="govuk-grid-row standout_container">
        <span className="standout_figure">{fullFigure}</span>
        <div className="standout_description_container">
          <p className="standout_description">{data?.text}</p>
          <a href={data.href}>{data?.linkText}</a>
        </div>
      </div>
      {!data?.bottomStat && (
        <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--s" />
      )}
    </main>
  );
};
