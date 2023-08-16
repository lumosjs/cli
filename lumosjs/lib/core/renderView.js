import path from "path";
import ejs from "ejs";
import fs from "fs/promises";
import { logger } from "#utils/logs";

/**
 * Renders a view using EJS templating engine.
 * @param {object} res - The custom response object.
 * @param {string} viewName - The name of the view.
 * @param {object} data - The data to be rendered in the view.
 */
export default async function renderView(res, viewName, data) {
  const currentFileUrl = import.meta.url;
  const currentFilePath = new URL(".", currentFileUrl).pathname;
  const filePath = path.join(
    currentFilePath,
    "..",
    "..",
    "views",
    viewName + ".ejs"
  );

  const rootPath = path.join(process.cwd(), "/views");

  try {
    const template = await fs.readFile(filePath, "utf8");
    const renderedHtml = ejs.render(template, data, {
      root: rootPath,
    });
    res.send(renderedHtml);
  } catch (error) {
    logger.error("rendering view: " + error);
  }
}