/**
 * Add your helpers here.
 * @module helpers
 * @example
 * export { Api } from './Api/Api';
 */

const replaceUrl = (originalPath, parentPath) => {
  const dashboard_name = parentPath.match(/(?<=\/dashboards\/).*./);
  const possible_url = originalPath.replace(
    /(?<=\/dashboards\/).+?(?=\/)/,
    dashboard_name,
  );
  return possible_url;
};

export { replaceUrl };
