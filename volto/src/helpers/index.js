/**
 * This module contains helper functions for the application.
 * @module helpers
 *
 * @example
 * // Import the replaceUrl function
 * import { replaceUrl } from './helpers';
 *
 * @function replaceUrl
 * @desc Replaces part of a URL path with a new dashboard name obtained from the parent path.
 * @param {string} originalPath - The original URL path to be modified.
 * @param {string} parentPath - The parent path containing the new dashboard name.
 * @returns {string} The modified URL path with the new dashboard name.
 *
 */

const replaceUrl = (originalPath, parentPath) => {
  if (!originalPath) {
    return originalPath;
  }
  const dashboard_name = parentPath.match(/(?:\/dashboards\/).*./);
  const possible_url = originalPath.replace(
    /(?:\/dashboards\/).+?(?=\/)/,
    dashboard_name,
  );
  return possible_url;
};

export { replaceUrl };
