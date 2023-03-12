import { readFileSync } from "fs";

const PATH = "../02-components/";

function fixPaths(compilerOptions) {
    const result = {};
    Object.keys(compilerOptions).forEach(key => {
        const value = compilerOptions[key];
        result[key] = value;
        if ("string" === typeof value) {
            if (value.startsWith(`${PATH}$`)) {
                result[key] = value.substring(PATH.length);
            } else if (value.startsWith(PATH)) {
                result[key] = `../${value.substring(PATH.length)}`;
            }
        }
    });
    return result;
}

const compilerOptions = JSON.parse(readFileSync(0, "utf-8")).compilerOptions;

const tsconfig = {
    compilerOptions: fixPaths(compilerOptions),
    include : ["../src/**/*.ts"]
};

console.log(JSON.stringify(tsconfig, undefined, 4)); // NOSONAR
