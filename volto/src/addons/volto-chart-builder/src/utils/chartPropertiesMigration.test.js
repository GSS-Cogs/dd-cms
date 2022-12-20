import migrateChartProperties from './chartPropertiesMigrator';

import {
  chartPropertiesSchemaWithAllSections,
  chartPropertiesSchemaWithoutLegendSection,
  chartPropertiesSchemaWithoutChartDimensionsMarginLeftProperty,
  storedPropertiesWithAllTestSections,
  storedPropertiesWithoutCompactBarChartSection,
  storedPropertiesWithOutChartDimensionsRightMargin,
} from './chartPropertiesMigrationTestData';

describe('migrateChartProperties', () => {
  test('migrateChartProperties removes the LegendSection from the chartProperties when passed a ChartPropertiesSchema with the legend section removed', () => {
    const migratedProperties = migrateChartProperties(
      storedPropertiesWithAllTestSections,
      chartPropertiesSchemaWithoutLegendSection,
    );
    expect(migratedProperties).not.toHaveProperty('LegendSection');
  });

  test('migrateChartProperties adds the compactBarChartProperties section to chartProperties with this section initially missing', () => {
    const migratedProperties = migrateChartProperties(
      storedPropertiesWithoutCompactBarChartSection,
      chartPropertiesSchemaWithAllSections,
    );
    expect(migratedProperties).toHaveProperty('compactBarChartProperties');
  });

  test('migrateChartProperties removes the chartDimensionProperties.marginLeft property from chartProperties when ChartPropertiesSchema does not contain this property.', () => {
    const migratedProperties = migrateChartProperties(
      storedPropertiesWithAllTestSections,
      chartPropertiesSchemaWithoutChartDimensionsMarginLeftProperty,
    );
    expect(migratedProperties.chartDimensionProperties).not.toHaveProperty(
      'marginLeft',
    );
  });

  test('migrateChartProperties adds the chartDimensionProperties.marginRight property to chartProperties when this property was initially missing', () => {
    const migratedProperties = migrateChartProperties(
      storedPropertiesWithOutChartDimensionsRightMargin,
      chartPropertiesSchemaWithAllSections,
    );
    expect(migratedProperties.chartDimensionProperties).toHaveProperty(
      'marginRight',
    );
  });
});
