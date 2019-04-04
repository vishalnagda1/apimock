import fs from "fs";

const SUCCESSFULL = 'Successfully loaded'
const CREATED = 'Created successfully'

const createDir = (path, directory, home) => {
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
                message: SUCCESSFULL,
                path: `${homeDir}`,
            };
        } catch (error) {
            return {
                directory: dirName,
                message: "directory already exists",
                path: `${homeDir}`,
            };
        }
    });
    return response;
};

export const create = async (request, h) => {
    // Validating payload
    const validData = (await validator.create.validate({ body: request.payload })).body;
    const response = validData.map(data =>
        createDir(`${pathUrl}${data.path}`, data.names, data.path),
    );
    return {
        status: 201,
        data: response,
        message: CREATED,
    };
};