# Change Log

## [1.0.20](https://github.com/david-04/launchpad/releases/tag/v1.0.20) (2025-08-10)

- Added Makefile command `lp.auto-import` to generate files with `import` statements for matching globs

## [1.0.19](https://github.com/david-04/launchpad/releases/tag/v1.0.19) (2025-08-09)

- Tweaked `tsconfig.json` settings
  - For web projects, set `jsx` to `react-jsx` (and don't set `jsxFactory`)
  - For web projects, set `module` to `esnext` and `moduleResolution` to `bundler`
  - For cli projects, set `module` to `nodenext` and `moduleResolution` to `nodenext`
  - For all projects, set `resolvePackageJsonExports` and `resolvePackageJsonImports` to `true`
- Bump Biome version number to `2.1.3`


## [1.0.18](https://github.com/david-04/launchpad/releases/tag/v1.0.18) (2025-07-19)

- Fixed syntax error (leading backslash) in the bundle

## [1.0.17](https://github.com/david-04/launchpad/releases/tag/v1.0.17) (2025-07-19)

- Added option `exclude=<package>` to the Makefile function `lp.bundle.add` (to exclude packages from bundling)
- Updated the Makefile `format` target to also include CSS files when using Biome
- Removed the `$schema` property from `biome.json`

## [1.0.16](https://github.com/david-04/launchpad/releases/tag/v1.0.16) (2025-07-05)

- Set `biome.configurationPath` only when launchpad is configured to manage VSCode settings
- Configure Biome to also format CSS

## [1.0.15](https://github.com/david-04/launchpad/releases/tag/v1.0.15) (2025-07-05)

- Switched to `pnpm` as the default package manager
- Set VSCode setting `biome.configurationPath` to null when using Biome

## [1.0.14](https://github.com/david-04/launchpad/releases/tag/v1.0.14) (2025-06-29)

- Fixed an issue that caused the uplift operation to overwrite unchanged files

## [1.0.13](https://github.com/david-04/launchpad/releases/tag/v1.0.13) (2025-06-28)

- Upgrade configuration to Biome 2

## [1.0.12](https://github.com/david-04/launchpad/releases/tag/v1.0.12) (2025-04-21)

- Set the lib in `tsconfig.json` to `ES2022` for cli and `ES2022` + `DOM` for web projects

## [1.0.11](https://github.com/david-04/launchpad/releases/tag/v1.0.11) (2025-03-23)

- Fixed truncation of the last test failure when displaying unit test results

## [1.0.10](https://github.com/david-04/launchpad/releases/tag/v1.0.10) (2025-03-21)

- Updated tsconfig.json templates to preserve code comments when compiling library projects
- Added new compiler options to uplift the tsconfig.json templates to TypeScript 5.8

## [1.0.9](https://github.com/david-04/launchpad/releases/tag/v1.0.9) (2025-02-07)

- Tweaked the Node test runner output (prepend full `describe` path to test case title)
- Added file extensions `jsx`, `cjs` and `mjs` to `.gitignore`

## [1.0.8](https://github.com/david-04/launchpad/releases/tag/v1.0.8) (2024-11-07)

- Print (rather than suppress) console.log output in unit tests

## [1.0.7](https://github.com/david-04/launchpad/releases/tag/v1.0.7) (2024-10-26)

- Add support for unit tests via the Node test runner (requires Node 22)
- Store Biome configuration in `.launchpad/biome.default.json` (and include it from `biome.json`)
- Upgrade default `tsconfig.json` settings to TypeScript 5.6
- Use a separate timestamp file instead of `.tsbuildinfo` for tracking Makefile dependencies
- Avoid accessing undefined Makefile variables
- Don't set the `<script>` type to `module` when using a bundler
- Fix SonarLint warnings

## [1.0.6](https://github.com/david-04/launchpad/releases/tag/v1.0.6) (2024-03-31)

- Auto-include a minimal `d.ts` file for `cli` projects that don't have Node typings installed (includes `console`, timer functions and `argv`, `env` and `exit` from `process`)
- Exclude the `DOM` library from `cli` projects' `tsconfig.json`

## [1.0.5](https://github.com/david-04/launchpad/releases/tag/v1.0.5) (2024-03-26)

- Updated default compiler settings in `tsconfig.default.json`
  - Enable top-level `await` for `cli` projects by setting `module` and `moduleResolution` to `NodeNext`
  - Set `lib` to the target ECMAScript version for `cli` projects that have Node typings installed (to prevent the auto-inclusion of `DOM`)
- Fixed uplift issues that made inadvertently changed the project settings
  - `.gitignore` was overwritten (with custom entries removed)
  - The bundler output directory was set to the tsc output directory
  - The bundler output directory was added to `.gitignore` even if it was not set (because bundling is disabled)
  - The ongoing management of VSCode settings (like code formatting) was cancelled
  - Please run `launchpad init` to review and correct the accidentally modified settings
- Fixed the module type setting in `package.json` (renaming the property from `module` to `type`)

## [1.0.4](https://github.com/david-04/launchpad/releases/tag/v1.0.4) (2024-03-17)

- Removed `baseUrl` from the CommonJS template version of `tsconfig.json`

## [1.0.3](https://github.com/david-04/launchpad/releases/tag/v1.0.3) (2024-02-26)

- Improved React compatibility by automatically including/compiling `tsx` files
- Improved Preact compatibility by setting `tsxFactory` to `h`

## [1.0.2](https://github.com/david-04/launchpad/releases/tag/v1.0.2) (2024-02-09)

- Fixed an issue that caused uplifts to fail (when using `.launchpad/uplift.sh` or `.bat`)

## [1.0.1](https://github.com/david-04/launchpad/releases/tag/v1.0.1) (2024-02-03)

- Fixed a `tsconfig.json` issue that prohibited top-level exports in ESM modules (`verbatimModuleSyntax` is now always set to `false`)
- Fixed a Makefile issue with `lp.run` that caused JavaScript files to not run at all and TypeScript files to run uncompiled through `node` (instead of `node-ts`)
- Tweaked the `--version` command line option to print the version number as a plain string

## [1.0.0](https://github.com/david-04/launchpad/releases/tag/v1.0.0) (2024-01-07)

- Set up project templates (app/lib, cli/web, cjs/esm)
- Configure and install development tools
  - Package manager ([npm](https://www.npmjs.com/package/npm), [pnpm](https://pnpm.io), [yarn](https://yarnpkg.com))
  - Formatter ([Biome](https://biomejs.dev), [Prettier](https://prettier.io))
  - Compiler ([TypeScript](https://www.npmjs.com/package/typescript), [ts-node](https://typestrong.org/ts-node/))
  - Bundler ([esbuild](https://esbuild.github.io), [DTS Bundle Generator](https://www.npmjs.com/package/dts-bundle-generator))
- Built-in template Makefile framework for [GNU Make](https://www.npmjs.com/package/dts-bundle-generator)
