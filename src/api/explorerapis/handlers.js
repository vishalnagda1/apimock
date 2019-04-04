import path from "path";
import { validator } from "./validator";
import { createDir, listDir, renameDir, deleteDir } from "./helper";
const SUCCESSFULL = "Successfully loaded"

const projectRoot = path.dirname(require.main.filename);
const pathUrl = projectRoot.concat('/storage');

/**
 * Create new directory
 * @property {string} path - path of the directory.
 * @property {array} names - names of the directory.
 * @returns {Object}
 */
export const create = async (request, h) => {
  // Validating payload
  const validData = (await validator.create.validate({ body: request.payload })).body;
  const response = validData.map(data =>
    createDir(`${pathUrl}${data.path}`, data.names, data.path),
  );
  return {
    status: 201,
    data: response,
    message: SUCCESSFULL,
  };
};

/**
 * List directories present in the root path
 * @property {string} path - root path of the directory.
 * @returns {Object}
 */
export const list = async (request, h) => {
  const { query } = request;
  const validData = (await validator.read.validate({ query })).query;
  const response = validData.path
    ? await listDir(`${pathUrl}${validData.path}`)
    : await listDir(`${pathUrl}/`);
  return response;
};

/**
 * Rename the directory
 * @property {string} path - root path of the directory.
 * @property {array} names - array of old and new name of the directory.
 * @returns {Object}
 */
export const rename = async (request, h) => {
  const validData = (await validator.update.validate({ body: request.payload })).body;
  const response = validData.map(data =>
    renameDir(`${pathUrl}${data.path}`, data.names, data.path),
  );
  return {
    status: 200,
    data: response,
    message: SUCCESSFULL,
  };
};

/**
 * Remove directories present in the root path
 * @property {string} query.path - root path of the directory.
 * @returns {Object}
 */
export const remove = async (request, h) => {
  const validData = (await validator.remove.validate({ body: request.payload })).body;
  const response = validData.map(data =>
    deleteDir(`${pathUrl}${data.path}`, data.names, data.path),
  );
  return response;
};
