// import { fail } from "../../utilities/fail.js";

// export const INIT_OPTIONS = {
//     projectName,
// };

// function parseProjectName(value: string) {
//     const trimmed = value.trim();
// }

// export function validateProjectName(value: string) {
//     const message = 'The name must not be empty nor contain blanks or reserved characters like ":", "\\" or "/"';
//     return !!value.match(/^[^:\\/<> \s]+$/) || message;
// }

// const parseArtifact = enumParser(
//     new Map([
//         ["app", "app"],
//         ["application", "app"],
//         ["lib", "lib"],
//         ["library", "lib"],
//     ] as const)
// );

// function enumParser<T extends string>(map: ReadonlyMap<string, T>) {
//     return (option: string, value: string) => {
//         const trimmed = value.trim();
//         const result = map.get(trimmed);
//         if (undefined === result) {
//             const keys = new Array<string>();
//             map.forEach((_value, key) => keys.push(key));
//             fail(`Invalid value ${trimmed} for ${option} (allowed values: ${keys.join(", ")})`);
//         }
//         return map.get(trimmed);
//     };
// }
