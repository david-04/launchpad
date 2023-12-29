# launchpad

A project starter to set up and maintain TypeScript projects

- [Features](#features)
- [Installation modes](#installation-modes)
- [Creating a new project](#creating-a-new-project)
- [The .launchpad directory](#the-launchpad-directory)
- [Using the Makefile](#using-the-makefile)
- [Uplifting projects](#uplifting-projects)
- [Reconfiguring projects](#reconfiguring-projects)

## Features

Launchpad is used to set up new TypeScript projects. This involves the following steps:

- Create common configuration files (like `tsconfig.json` and `package.json`)
- Set up the package manager (`npm`, `pnpm`, or `yarn`)
- Set up a code formatter ([Prettier](https://prettier.io) or [Biome](https://biomejs.dev))
- Set up a bundler ([esbuild](https://esbuild.github.io)) and a `d.ts` declaration bundler ([DTS Bundle Generator](https://www.npmjs.com/package/dts-bundle-generator))
- Integrate with [GNU Make](https://www.gnu.org/software/make/) through a framework of pre-configured rules and dependencies
- Create a basic set of template source files with a matching Makefile
- Configure the project according to the requirements (application or library, command line or web, CommonJS or ECMAScript modules)

After a project has been created, launchpad takes care of its ongoing maintenance. Projects can be reconfigured (e.g. switched to another formatter or package manager). When a newer version of launchpad is released, it can also uplift existing projects:

- Upgrade to the latest version of launchpad's default `tsconfig.json` and its built-in [GNU Make](https://www.gnu.org/software/make/) rules and dependencies
- Maintain configuration files (like code formatter settings) to preserve compatibility with the development tools' latest versions
- Switch development tools to launchpad's latest recommended default (unless the current selection is pinned)

Launchpad aims to be an easy option for setting up new TypeScript projects and keeping them up-to-date as the ecosystem of development tools evolves.

## Installation modes

Launchpad can be added as a dependency of the project itself, installed globally, or run without installation.

- Add launchpad as a project dependency
  - npm: `npm install --save-dev @david-04/launchpad`
  - pnpm: `pnpm add --save-dev @david-04/launchpad`
  - yarn: `yarn add --dev @david-04/launchpad`
- Install launchpad globally
  - npm: `npm install --global @david-04/launchpad`
  - pnpm: `pnpm add --global @david-04/launchpad`
  - yarn (classic only): `yarn global add @david-04/launchpad`
- Run without installation
  - npm: `npm exec --yes -- @david-04/launchpad@latest`
  - pnpm: `pnpm dlx @david-04/launchpad@latest`
  - yarn: `yarn dlx @david-04/launchpad@latest`

When installed as a local project dependency, launchpad upgrades itself to the latest version during uplifts. Globally installed versions need to be upgraded manually.

## Creating a new project

Add/install `@david-04/launchpad` as a project dependency (unless using a globally installed version or running without installation) and run:

```shell
launchpad init
```

This starts a prompt-based wizard to configure the project:

```
√ Project name ... my-sample-project
√ Artifact » app
√ Runtime » cli
√ Module system » esm
√ Launchpad installation mode » global
√ Bundler » default
√ DTS bundler » default
√ Formatter » default
√ Tab size ... 4
√ Package manager » default
√ Source directory ... src
√ TSC output directory ... build
√ Bundler output directory ... dist
√ Install packages » @types/node
√ Install dev dependencies (compiler, bundler, formatter, ...) » Yes
√ Uplift all dependencies (not just launchpad) » Yes
? Manage VSCode settings » [space | arrow right/left] = toggle selection; [enter / return] = save and continue
(*)   formatter - use the project's formatter (if it has any)
(*)   format-on-save
(*)   future-settings
```

Launchpad then creates the required files and directories and installs the dependencies:

```
Initializing project interactive...

- Created C:/my-sample-project/.launchpad/launchpad.cfg
- Created C:/my-sample-project/.launchpad/Makefile.documentation
- Created C:/my-sample-project/.launchpad/Makefile.header
- Created C:/my-sample-project/.launchpad/Makefile.footer
- Created C:/my-sample-project/.launchpad/tsconfig.default.json
- Created C:/my-sample-project/.launchpad/uplift
- Created C:/my-sample-project/.launchpad/uplift.bat
- Created C:/my-sample-project/.vscode/settings.json
- Created C:/my-sample-project/dist
- Created C:/my-sample-project/src/interactive.ts
- Created C:/my-sample-project/.gitignore
- Created C:/my-sample-project/biome.json
- Created C:/my-sample-project/Makefile
- Created C:/my-sample-project/package.json
- Created C:/my-sample-project/tsconfig.json
- Installing dependencies...

added 24 packages, and audited 25 packages in 12s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities

✅ Successfully initialized project interactive
```

Configuration settings can also be specified as command line options:

```
my-sample-project > launchpad --help
```

```
Usage: launchpad [COMMAND] [OPTIONS]

[COMMAND]

  init .......... initialize a new project or re-configure an existing one
  uplift ........ upgrade all dependencies (including launchpad) to the latest version

[OPTIONS]

  --artifact=[app | lib]                                                    Project type
  --auto-selected-dependencies=[<dep1>, <dep2>, ...]                        NPM packages to install without without prompting
  --bundler-out-dir=[<DIR> | default]                                       Bundler output directory
  --bundler=[default | esbuild | disabled]                                  Bundler
  --create-debug-module=[true | false]                                      Create a debug.ts file
  --create-makefile=[true | false]                                          Create a template Makefile
  --create-project-template=[true | false]                                  Create a basic project template (main module, Makefile, ...)
  --dts-bundler=[default | dts-bundle-generator | disabled]                 Bundler for declaration files (d.ts)
  --formatter=[default | prettier | biome | disabled]                       Code formatter
  --install-dev-dependencies=[true | false]                                 Install development tools (compiler, bundler, formatter, ...) locally
  --installation-mode=[local | global | temp | npx | pnpm-dlx | yarn-dlx]   Location of the the launchpad npm package
  --module-system=[default | cjs | esm]                                     Target module system
  --optional-dependencies=[<dep1>, <dep2>, ...]                             Optional (non-pre-selected) NPM packages offered for installation
  --package-manager=[default | npm | pnpm | yarn]                           Package manager
  --preselected-dependencies=[<dep1>, <dep2>, ...]                          Pre-selected NPM packages offered for installation
  --project-name=[<NAME> | default]                                         Name of the main module/project
  --runtime=[cli | node | web]                                              Runtime environment
  --src-dir=[<DIR> | default]                                               Relative path to the source directory
  --tab-size=<SIZE>                                                         Tab size (for code formatting)
  --tsc-out-dir=[<DIR> | default]                                           TypeScript compiler output directory
  --uplift-dependencies=[true | false]                                      Upgrade all npm packages during uplifts
  --vscode-settings=[default,formatter,format-on-save,future-settings]      Create settings for VSCode
  --web-app-dir=[<DIR> | default]                                           Relative path to the web application (with the index.html)
```

A few settings can only be configured through command line options. For example, launchpad always creates a `Makefile` (without prompting) unless `--create-makefile` is set to `false`.

All options can also be set to `default` (instead of a specific value). This causes launchpad to use its recommended default value (without prompting). The default value is the one that would be suggested/preselected in the configuration wizard. The suggested defaults might change in the future.

For some enumerated values (like the formatter or package manager), `default` can also be selected as an option in the configuration wizard. It causes launchpad's recommended default to be used, but (unlike picking a specific option) doesn't pin it. This allows launchpad to switch to a different option when performing uplifts in the future.

Launchpad's goal is to keep projects and their toolchains up to date. When creating a new project today, [Prettier](https://prettier.io) and [ts-node](https://typestrong.org/ts-node/) might be sensible defaults. But as new tools emerge in the future, it might be beneficial to switch to other options like [Biome](https://biomejs.dev) or [Bun](https://bun.sh). Granting Launchpad the autonomy to switch between options simplifies the ongoing maintenance. Instead of manually having to reconfigure each project interactively, it's enough to simply run launchpad's uplift operation.

## The .launchpad directory

Launchpad creates a `.launchpad` directory within the project's root directory. It's used to store the project configuration, scripts and include files (like the default `tsconfig.json`) that are imported from the main project. The `.launchpad` directory makes the project self-contained and should be added to git. Make and other development tools can run without launchpad itself being installed (locally or globally).

## Using the Makefile

To avoid unnecessary compiling and bundling, launchpad ships with a Makefile framework. It uses GNU-specific features and is only compatible with [GNU Make](https://www.gnu.org/software/make/).

When initializing a project, launchpad creates a basic Makefile in the project's root directory. Its default target compiles the application and - if applicable - bundles and runs it:

```
my-sample-project > make
```

``` 
Compiling...
Bundling dist/my-sample-project.js...
This is my-sample-project
```

The `help` target displays a list of all available targets:

```
my-sample-project > make help
```

```
bundle ............. create bundles
clean .............. delete temporary files
compile ............ compile TypeScript sources
format ............. format sources with biome
help ............... list all targets
tsc ................ compile TypeScript sources
uplift ............. uplift launchpad
<target>.help ...... show diagnostic information (aliases: debug help info)
```

All built-in targets can be customized (or disabled) by using predefined macros. They are documented in [.launchpad/Makefile.documentation](https://github.com/david-04/launchpad/blob/main/.launchpad/Makefile.documentation). 

The configuration of built-in targets can be inspected by appending `.help` to the target's name:

```
my-sample-project > make tsc.help
```

```
#-----------------------------------------------------------------------------------------------------------------------
# Compile settings
#-----------------------------------------------------------------------------------------------------------------------

Enabled:
true

Phony names:
compile tsc

Targets:
build/.tsbuildinfo

Prerequisites:
.launchpad/Makefile.footer .launchpad/Makefile.header .launchpad/launchpad.cfg .launchpad/tsconfig.default.json Makefile src/my-sample-app.ts tsconfig.json

Default command:
tsc -b && touch "build/.tsbuildinfo"

Before-hooks:
<none>

Effective command:
tsc -b && touch "build/.tsbuildinfo"

After-hooks:
<none>

Command with hooks:
tsc -b && touch "build/.tsbuildinfo"
```

In addition to using Make, launchpad also enables [incremental builds](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#faster-subsequent-builds-with-the---incremental-flag) in TypeScript. This speeds up the compilation process whenever a recompile is required.

Projects can also be compiled manually by running `tsc -b`. It's not necessary to use the Makefile. However, if the project requires bundling, it's strongly recommended to use the Makefile. It hides all the complexity and automatically generates the required commands. It uses launchpad's project configuration and needs almost no extra setup. Moreover, launchpad might support other bundlers in the future. Makefiles are expected to continue working with any bundler that launchpad might support in the future.

## Uplifting projects

Uplifting a project brings its configuration and toolchain up-to-date. An uplift might include the following steps:

- Upgrade launchpad itself to the latest version (if it's installed as a dependency within the project itself)
- Switch development tools (package manager, bundler, formatter, ...) to launchpad's current defaults (except for development tools that have been pinned)
- Upgrade all dependencies to the latest version (if enabled in the project's configuration)
- Update configuration files (like `package.json`, `tsconfig.json`, and formatter settings)
- Repopulate the `.launchpad` directory with the latest version of scripts and Makefiles

An uplift can be initiated through the Makefile:

```
my-sample-project > make uplift
```

This executes the uplift script in the `.launchpad` directory. This script can also be invoked manually (without using make):

```
my-sample-project > ./.launchpad/uplift
```

Uplifts are only applied when there is a valid project configuration. Errors in `.launchpad/launchpad.cfg` cause the uplift operation to fail. A broken configuration that can't be fixed manually can be reset by reconfiguring the project.

## Reconfiguring projects

A project can be reconfigured by running `launchpad init` in a directory that has already been initialized.  Technically, it's almost the same as initializing a new project. But launchpad also reads the current project configuration and uses the settings as presets for the configuration wizard. 

The init operation tolerates errors in the configuration file. It can be used to correct broken project settings. However, the primary use case is to change a project's configuration. This might involve switching to a different formatter or package manager or changing source and output directories.
