import fs from "fs";

const SUCCESSFULL = 'Successfully loaded'
const CREATED = 'Created successfully'
const UPDATED = 'Updated successfully'
const DELETED = 'Deleted successfully'
const DOES_NOT_EXIST = 'Does not exist'
const ALREADY_EXIST = 'Already exist'

export const permFormat = num => {
    switch (num) {
        case "0":
            return "no permissin";
        case "1":
            return "execute only";
        case "2":
            return "write only";
        case "3":
            return "write and execute";
        case "4":
            return "read only";
        case "5":
            return "read and execute";
        case "6":
            return "read and write";
        case "7":
            return "read write and execute";
        default:
            return "default";
    }
};
/**
 * Create Directory
 * @property {string} path - path of the directory.
 * @property {array} directory - names of the directory.
 * @property {string} home - home path.
 * @returns {Object}
 */
export const createDir = (path, directory, home) => {
    let dirPath = !path.endsWith("/") ? `${path}/` : path;
    dirPath = path.endsWith("//") ? path.substring(0, path.length - 1) : dirPath;
    let homeDir = !home.endsWith("/") ? `${home}/` : home;
    homeDir = home.endsWith("//") ? home.substring(0, home.length - 1) : homeDir;
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    const response = directory.map(dirName => {
        try {
            fs.mkdirSync(`${dirPath}${dirName}`);
            return {
                directory: dirName,
                message: CREATED,
                path: `${homeDir}`,
            };
        } catch (error) {
            return {
                directory: dirName,
                message: `directory ${ALREADY_EXIST}`,
                path: `${homeDir}`,
            };
        }
    });
    return response;
};

/**
 * List directories.
 * @property {string} path - path of the directory.
 * @returns {Object}
 */
export const listDir = path => {
    const resData = [];
    try {
        const directory = fs.readdirSync(path);
        directory.forEach(dirName => {
            const fsData = fs.statSync(`${path}/${dirName}`);
            // obtain the mode for that particular file/directory.
            const mode = `${fsData.mode.toString(8).slice(-3)}`;
            const modeArray = mode.split("");
            const permission = {
                mode,
                owner: permFormat(modeArray[0]),
                group: permFormat(modeArray[1]),
                others: permFormat(modeArray[2]),
            };
            // check if the selected name is a directory or not.
            const type = fsData.isDirectory() ? "directory" : "file";
            // response of that particular file.
            resData.push({
                name: dirName,
                type,
                size: `${fsData.size} Bytes`,
                permissions: permission,
                "access time": fsData.atime,
                "modification time": fsData.mtime,
                "created time": fsData.birthtime,
            });
        });
        // final response.
        return {
            data: resData,
            message: SUCCESSFULL,
        };
    } catch (error) {
        // error response.
        return {
            message: `directory ${DOES_NOT_EXIST}`,
            path,
        };
    }
};

/**
 * Rename Directory
 * @property {string} oldPath - path of the directory.
 * @property {array} directory - aray of old name and new name of the directory.
 * @property {string} home - home path.
 * @returns {Object}
 */
export const renameDir = (oldPath, directory, home) => {
    let dirPath = !oldPath.endsWith("/") ? `${oldPath}/` : oldPath;
    dirPath = oldPath.endsWith("//")
        ? oldPath.substring(0, oldPath.length - 1)
        : dirPath;
    let homeDir = !home.endsWith("/") ? `${home}/` : home;
    homeDir = home.endsWith("//") ? home.substring(0, home.length - 1) : homeDir;
    return directory.map(name => {
        let response;
        try {
            if (!fs.existsSync(`${dirPath}${name[1]}`)) {
                fs.renameSync(`${dirPath}${name[0]}`, `${dirPath}${name[1]}`);
                response = {
                    oldName: name[0],
                    newName: name[1],
                    message: UPDATED,
                    path: `${homeDir}`,
                };
            } else {
                response = {
                    directory: name[1],
                    message: `directory ${ALREADY_EXIST}`,
                    path: `${homeDir}`,
                };
            }
        } catch (error) {
            // error response.
            response = {
                directory: name[0],
                message: `directory ${DOES_NOT_EXIST}`,
                path: `${homeDir}`,
            };
        }
        return response;
    });
};

/**
 * Delete a directory.
 * @property {string} path - path of the directory.
 * @property {array} directory - names of the directory.
 * @property {string} home - home path.
 * @returns {Object}
 */
export const deleteDir = (path, directory, home) => {
    let dirPath = !path.endsWith("/") ? `${path}/` : path;
    dirPath = path.endsWith("//") ? path.substring(0, path.length - 1) : dirPath;
    let homeDir = !home.endsWith("/") ? `${home}/` : home;
    homeDir = home.endsWith("//") ? home.substring(0, home.length - 1) : homeDir;
    const response = directory.map(dirName => {
        try {
            emptyDir(`${dirPath}${dirName}`);
            return {
                directory: dirName,
                message: DELETED,
                path: `${homeDir}`,
            };
        } catch (error) {
            return {
                directory: dirName,
                message: "directory doesn't exists",
                path: `${homeDir}`,
            };
        }
    });
    return response;
};

/**
 * Delete all the files in a directory.
 * @property {string} path - path of the directory.
 */
export const emptyDir = path => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = `${path}/${file}`;
            if (fs.statSync(curPath).isDirectory()) {
                emptyDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
    }
    fs.rmdirSync(path);
};
