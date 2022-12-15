// migrateChartProperties is a function that takes the stored properties of existing chart content (i.e. Volto blocks JSON)
// and updates the properties to conform to the ChartPropertiesSchema (which is the up to date source of truth on chart
// properties). Specifically it will add any sections and properties that are missing from the stored properties. Applying
// default values to any properties that are added. It will also remove any sections and properties that are not in the
// ChartPropertiesSchema.

// Properties in Chart Builder are arranged in sections (both in the side panel in the UI and in the data structures that
// are used to represent the properties). Logically each section has a name and one or more properties. Properties in turn
// each have a name and a value (a key-value pair).

// IMPORTANT! The structure and content of the ChartPropertiesSchema and the storedProperties are different to each other.
// Examples of each are given at the end of this file and a summary of the differences is given below.

// **ChartPropertiesSchema**

// ChartPropertiesSchema is an array of section objects, each section has at minimum a name and an array of property objects.
// The properties in turn have at minimum a name, value and a default value. ChartPropertiesSchema also contains other properties
// that are used to generate the property controls in the side-panel (e.g. property display name, type, options, etc).

// **storedProperties**

// storedProperties is an object with one or more sections that have a name (key) and a value that is an object
// containing the properties for that section in key-value pairs. storedProperties is a much leaner representation of the
// properties than ChartPropertiesSchema. Essentially it stores the currently selected values for each property.

// The top level reducer iterates through the sections of the chart properties schema and checks if there is a
// corresponding section in the stored properties.

// The nested reducer iterates through the properties of the current section and checks if there is a corresponding
// property in the stored properties. If there is it keeps the stored value, otherwise we use the default value from
// the chart properties schema.

// The returned migrated properties will have the section-property structure specified in ChartPropertiesSchema.
// As a consequence, any sections or properties that are not in ChartPropertiesSchema will be essentially be removed during
// the migration.

function migrateChartProperties(storedProperties, ChartPropertiesSchema) {
  // Get the sections and properties from the stored properties object
  const sections = Object.keys(storedProperties);
  const properties = Object.values(storedProperties);

  const migratedProperties = ChartPropertiesSchema.reduce((acc, section) => {
    const storedSection = sections.find(
      (x) => x.toLowerCase() === section.name.toLowerCase(),
    );

    acc[section.name] = section.properties.reduce((acc, property) => {
      const storedValue = storedSection
        ? properties[sections.indexOf(storedSection)][property.name]
        : undefined;
      acc[property.name] = storedValue ? storedValue : property.defaultValue;
      return acc;
    }, {});
    return acc;
  }, {});

  return migratedProperties;
}

export default migrateChartProperties;
